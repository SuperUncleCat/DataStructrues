function LinearProbing(){
  let table=[];

  let HashCode=function(key){
    let hash=0;

    for(let i=0;i<key.length;i++){
      hash+=key.charCodeAt(i);
    }
    return hash%(2*key.length);
  };

  let ValuePair=function(key,value){
    this.key=key;
    this.value=value;
    this.toString=function(){
      return '[' + this.key + ' - ' + this.value + ']';
    }
  };

  this.put=function(key,value){
    var position=HashCode(key);
    if(table[position]==undefined){
      table[position]=new ValuePair(key,value);
    }else{
      var index=++position;
      while(table[index]!=undefined){
        index++;
      }
      table[index]=new ValuePair(key,value);
    }
  };

  this.get=function(key){
    var position=HashCode(key);
    if(table[position]!==undefined){
      if(table[position].key===key){
        return table[position].value;
      }else{
        var index=++position;
        while(table[index]===undefined||table[index].key!==key){
          index++;
        }
        if(table[index].key===key){
          return table[index].value;
        }
      }
    }
    return undefined;
  };
}

var hash=new LinearProbing();
hash.put("apple","a");
hash.put("banana","b");
hash.put("cat","c");
hash.put("0","d");
hash.put("1","e");
hash.put("2","f");
hash.put("10","g");
hash.put("11","h");
hash.put("12","i");

console.log(hash.get("apple"));
console.log(hash.get("banana"));
console.log(hash.get("cat"));
console.log(hash.get("2"));
console.log(hash.get("0"));
