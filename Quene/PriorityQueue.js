function PriorityQueue(){
  let items=[];

  function QueueElement(ele,priority){
    this.ele=ele;
    this.priority=priority;
  }

  this.push=function(ele,priority){
    var ele=new QueueElement(ele,priority);

    if(this.isEmpty()){
      items.push(ele);
    }else{
      var mark=false;

      for(let i=0;i<items.length;i++){
        if(ele.priority<items[i].priority){
          items.splice(i,0,ele);
          mark=true;
          break;
        }
      }

      if(!mark){
        items.push(ele);
      }
    }
  }
}
