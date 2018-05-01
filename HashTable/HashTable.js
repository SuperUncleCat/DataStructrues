//以下为分离链接法
function HashTable(){
  var table=[];

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
      return '['+this.key+' - '+this.value+']';
    }
  }

  this.put=function(key,value){
    let position=HashCode(key);
    if(table[position]==undefined){
      table[position]=new LinkedList();
    }
    console.log(position+' - '+key);
    table[position].append(new ValuePair(key,value));
  };

  this.get=function(key){
    let position=HashCode(key);

    if(table[position]!==undefined){
      let current=table[position].getHead();
      while(current.next){
        if(current.element.key===key){
          return current.element.value;
        }
        current=current.next;
      }

      if(current.element.key===key){
        return current.element.value;
      }
    }
    return undefined;
  };

  this.remove=function(key){
    var position=HashCode(key);
    if(table[position]!==undefined){
      var current=table[position].getHead();
      while(current.next){
        if(current.element.key===key){
          table[position].remove(current.element);
          if(table[position].isEmpty()){
            table[position]=undefined;
          }
          return true;
        }
        current=current.next;
      }
      if(current.element.key===key){
        table[position].remove(current.element);
        if(table[position].isEmpty()){
          table[position]=undefined;
        }
        return true;
      }
    }
    return false;
  };
}

var hash=new HashTable();
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
console.log(hash.get("1"));

//以下为链表的实现
function LinkedList(){
  let Node=function(element){
    this.element=element;
    this.next=null;
  };

  let length=0;

  let head=null;

  this.getHead=function(){
    return head;
  };

  this.append=function(element){
    let node=new Node(element),
    current;

    if(head==null){
      head=node;
    }else{
      current=head;

      while(current.next){
        current=current.next;
      }

      current.next=node;
    }

    length++;
  };

  this.insert=function(position,element){
    if(position>=0&&position<=length){
      var node=new Node(element),
      current=head,
      previous,
      index=0;

      if(position===0){
        node.next=current;
        head=node;
      }else{
        while (index++<position) {
          previous=current;
          current=current.next;
        }

        node.next=current;
        previous.next=node;
      }

      length++;
      return true;
    }else{
      return false;
    }
  };

  this.removeAt=function(position){
    if(position>-1&&position<length){
      var current=head,
      previous,
      index=0;

      if(position===0){
        head=current.next;
      }else{
        while (index++<position) {
          previous=current;
          current=current.next;
        }

        previous.next=current.next;
      }

      length--;
      return current.element;
    }else{return null;}
  };

  this.remove=function(element){
    var index=this.indexOf(element);
    return this.removeAt(index);
  };

  this.indexOf=function(element){
    var current=head,
    index=-1;
    while (current) {
      if(element===current.element){
        return index;
      }
      index++;
      current=current.next;
    }
    return -1;
  };

  this.isEmpty=function(){
    return length===0;
  };

  this.size=function(){
    return length;
  };

  this.toString=function(){
    var current=head;
    string="";
    while (current) {
      string=current.element;
      current=current.next;
    }

    return string;
  };

  this.print=function(){}

}
