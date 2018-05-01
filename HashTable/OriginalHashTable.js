function HashTable(){
  var table=[];

  let HashCode=function(key){
    let hash=0;
    for(let i=0;i<key.length;i++){
      hash+=key.charCodeAt(i);
    }
    return hash%(2*key.length);
  };

  this.put = function(key, value){
		let position = HashCode(key);
		console.log(position + ' - ' + key);
		table[position] = value;
	};

  this.get = function(key){
		return table[HashCode(key)];
	};

  this.remove = function(key){
  		table[HashCode(key)] = undefined;
  };
}
