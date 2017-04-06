pragma solidity ^0.4.4;

contract SafeMath {
  //internals

  function safeMul(uint a, uint b) internal returns (uint) {
    uint c = a * b;
    assert(a == 0 || c / a == b);
    return c;
  }

  function safeSub(uint a, uint b) internal returns (uint) {
    assert(b <= a);
    return a - b;
  }

  function safeAdd(uint a, uint b) internal returns (uint) {
    uint c = a + b;
    assert(c>=a && c>=b);
    return c;
  }

  function safeDiv(uint a, uint b) internal returns (uint) {
      assert(b > 0);
      uint c = a / b;
      assert(a == b * c + a % b);
      return c;
  }

  function assert(bool assertion) internal {
    if (!assertion) throw;
  }
}

/**
 * ERC 20 token
 *
 */
contract Token {

    /// @return total amount of tokens
    function totalSupply() constant returns (uint256 supply) {}

    /// @param _owner The address from which the balance will be retrieved
    /// @return The balance
    function balanceOf(address _owner) constant returns (uint256 balance) {}

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transfer(address _to, uint256 _value) returns (bool success) {}

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {}

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return Whether the approval was successful or not
    function approve(address _spender, uint256 _value) returns (bool success) {}

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {}

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

}

/**
 * ERC 20 token
 *
 */
contract StandardToken is Token {

    /**
     * Reviewed:
     * - Interger overflow = OK, checked
     */
    function transfer(address _to, uint256 _value) returns (bool success) {
        //Default assumes totalSupply can't be over max (2^256 - 1).
        //If your token leaves out totalSupply and can issue more tokens as time goes on, you need to check if it doesn't wrap.
        //Replace the if with this one instead.
        if (balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        //if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] -= _value;
            balances[_to] += _value;
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        //same as above. Replace this line with the following if you want to protect against wrapping uints.
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && balances[_to] + _value > balances[_to]) {
        //if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }

    mapping(address => uint256) balances;

    mapping (address => mapping (address => uint256)) allowed;

    uint256 public totalSupply;

}


/**
 * MoldCoin ICO contract.
 *
 */
contract MoldCoin is StandardToken, SafeMath {

    string public name = "MoldCoin";
    string public symbol = "MOLD";
    uint public decimals = 16;

    uint internal baseNumber = 10**(18-decimals);

    uint public startDatetime; //crowdsale start datetime seconds
    uint public firstStageDatetime; //first 120 hours crowdsale in seconds
    uint public secondStageDatetime; //second stage, 240 hours of crowsale in seconds.
    uint public endDatetime; //crowdsale end datetime seconds (set in constructor)

    // Initial founder address (set in constructor)
    // All deposited ETH will be instantly forwarded to this address.
    address public founder = 0x0;

    uint public coinAllocation = 20 * 10**8 * 10**16; //2000M tokens supply for crowdsale
    uint public angelAllocation = 1 * 10**8 * 10**16; // 100M of token supply allocated angel investor
    uint public founderAllocation = 4 * 10**8 * 10**16; //400M of token supply allocated for the founder allocation

    bool public bountyAllocated = false; //this will change to true when the bounty fund is allocated
    bool public angelAllocated = false; //this will change to true when the ecosystem fund is allocated
    bool public founderAllocated = false; //this will change to true when the founder fund is allocated

    uint public saleTokenSupply = 0; //this will keep track of the token supply created during the crowdsale
    uint public amountRaised = 0; //this will keep track of the Ether raised during the crowdsale

    uint public angelTokenSupply = 0; //this will keep track of the token angel supply

    //add supply per month 1% until all coin was allocated in the end of crowdsale will keep track of the token angel supply
    uint public lastInflationDatetime = 0;
    uint public inflatableSupply = 0;

    bool public halted = false; //the founder address can set this to true to halt the crowdsale due to emergency

    event Buy(address indexed sender, uint eth, uint mold);
    event Withdraw(address indexed sender, address to, uint eth);
    event AllocateFounderTokens(address indexed sender);
    event AllocateAngelTokens(address indexed sender, address to, uint mold);

    /**
     *
     * Integer value representing the number of seconds since 1 January 1970 00:00:00 UTC
     */
    function MoldCoin(uint startDatetimeInSeconds) {

        founder = msg.sender;
        startDatetime = startDatetimeInSeconds;
        firstStageDatetime = startDatetime + 120 * 1 hours;
        secondStageDatetime = firstStageDatetime + 240 * 1 hours;
        endDatetime = secondStageDatetime + 2040 * 1 hours;

    }

    /**
     * - Price for crowdsale by time
     */
    function price(uint timeInSeconds) constant returns(uint) {
        if (timeInSeconds < startDatetime) return 0;
        if (timeInSeconds <= firstStageDatetime) return 500; //120 hours
        if (timeInSeconds <= secondStageDatetime) return 333; //240 hours
        if (timeInSeconds <= endDatetime) return 250; //2040 hours
        return 250;
    }
    /**
     * allow anyone sends funds to the contract
     */
    function buy() payable {
        buyRecipient(msg.sender);
    }

    function() payable {
        buyRecipient(msg.sender);
    }

    /**
     * Main token buy function.
     * Buy for the sender itself or buy on the behalf of somebody else (third party address).
     */
    function buyRecipient(address recipient) payable {
        if (now < startDatetime || halted) throw;
        if (inflatableSupply == 0 && now > endDatetime) throw;

        uint tokens = safeMul(msg.value, price(now))/baseNumber;

        if ( safeAdd(saleTokenSupply,tokens)>coinAllocation ) throw;

        if (inflatableSupply != 0 ) {
            if( tokens > inflatableSupply ) throw;
            inflatableSupply = safeSub(inflatableSupply, tokens);
        }

        balances[recipient] = safeAdd(balances[recipient], tokens);

        saleTokenSupply = safeAdd(saleTokenSupply, tokens);
        totalSupply = safeAdd(totalSupply, tokens);

        amountRaised = safeAdd(amountRaised, msg.value);

        if (!founder.call.value(msg.value)()) throw; //immediately send Ether to founder address

        Buy(recipient, msg.value, tokens);
    }

    /**
     * Set up founder address token balance.
     */
    function allocateFounderTokens() {
        if (msg.sender!=founder) throw;
        if (now <= endDatetime) throw;

        if (founderAllocated) throw;

        balances[founder] = safeAdd(balances[founder], founderAllocation);

        totalSupply = safeAdd(totalSupply, founderAllocation);

        founderAllocated = true;
        AllocateFounderTokens(msg.sender);
    }

    /**
     * Set up angel address token balance.
     */
    function allocateAngelTokens(address angel, uint tokens) {
        if (msg.sender!=founder) throw;
        if (now <= endDatetime) throw;

        uint amount = tokens*10**decimals;
        if ( safeAdd(angelTokenSupply,amount)>angelAllocation ) throw;

        angelTokenSupply = safeAdd(angelTokenSupply, amount);
        balances[angel] = safeAdd(balances[angel], amount);
        totalSupply = safeAdd(totalSupply, amount);

        AllocateAngelTokens(msg.sender, angel, amount);
    }

    /**
     * Emergency Stop ICO.
     */
    function halt() {
        if (msg.sender!=founder) throw;
        halted = true;
    }

    function unhalt() {
        if (msg.sender!=founder) throw;
        halted = false;
    }

    /**
     * Change founder address (where ICO ETH is being forwarded).
     */
    function changeFounder(address newFounder) {
        if (msg.sender!=founder) throw;
        founder = newFounder;
    }

    /**
     * Inflation
     */
    function inflate(uint tokens) {
        if (msg.sender!=founder) throw;
        if (now < endDatetime + 4 weeks) throw;
        if (now < lastInflationDatetime + 4 weeks) throw;

        uint amount = tokens*10**decimals;
        if (safeAdd(safeAdd(saleTokenSupply, inflatableSupply), amount) > coinAllocation) throw;

        inflatableSupply = safeAdd(inflatableSupply, amount);
        lastInflationDatetime = now;
    }

    /**
     * ERC 20 Standard Token interface transfer function
     *
     * Prevent transfers until crowdsale period is over.
     */
    function transfer(address _to, uint256 _value) returns (bool success) {
        if (now <= endDatetime && msg.sender!=founder) throw;
        return super.transfer(_to, _value);
    }

    /**
     * ERC 20 Standard Token interface transfer function
     *
     * Prevent transfers until crowdsale period is over.
     */
    function transferFrom(address _from, address _to, uint256 _value) returns (bool success) {
        if (now <= endDatetime && msg.sender!=founder) throw;
        return super.transferFrom(_from, _to, _value);
    }


}