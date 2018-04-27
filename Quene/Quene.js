function Quene(){
  let items=[];

  this.push=function(ele){
    items.push(ele);
  };

  this.shift=function(){
    items.shift();
  };

  this.head=function(){
    return items[0]
  };

  this.isEmpty=function(){
    return items.length===0;
  };

  this.size=function(){
    return items.length;
  };

  this.print=function(){
    console.log(items.toString());
  };
}
