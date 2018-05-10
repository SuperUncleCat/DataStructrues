let AVLTree=(function(){
  class Node{
    constructor(key){
      this.key=key;
      this.left=null;
      this.right=null;
    }
  }

  class AVLTree{
    constructor(){
      this.root=null;
      this.parentNode;
      this.nodeToBeDeleted;
    }

    getRoot(){
      return this.root;
    };

    heightNode(node){
      if(node===null){
        return -1;
      }else{
        return Math.max(this.heightNode(node.left),this.heightNode(node.right))+1;
      }
    };

    rotationLL(node){
      var tmp=node.left;
      node.left=tmp.right;
      tmp.right=node;

      return tmp;
    };//在node的左子树的左子树插入

    rotationRR(node){
      var tmp=node.right;
      node.right=tmp.left;
      tmp.left=node;

      return tmp;
    };//在node的右子树的右子树插入

    rotationLR(node){
      node.left=this.rotationRR(node.left);
      return this.rotationLL(node);
    };//在node的左子树的右子树插入

    rotationRL(node){
      node.right=this.rotationLL(node.right);
      return this.rotationRR(node);
    };//在node的右子树的左子树插入

    insertNode(node,element){
      if(node===null){
        node=new Node(element);
      }else if(element<node.key){
        node.left=this.insertNode(node.left,element);

        if(node.left!==null){
          if((this.heightNode(node.left)-this.heightNode(node.right))>1){
            if(element<node.left.key){
              node=this.rotationLL(node);
            }else{
              node=this.rotationLR(node);
            }
          }
        }
      }else if(element>node.key){
        node.right=this.insertNode(node.right,element);

        if(node.right!==null){
          if((this.heightNode(node.right)-this.heightNode(node.left))>1){
            if(element>node.right.key){
              node=this.rotationRR(node);
            }else{
              node=this.rotationRL(node);
            }
          }
        }
      }

      return node;
    };

    insert(element){
      this.root=this.insertNode(this.root,element);
    };

    findMinNode(node) {
        while(node && node.left !== null) {
            node = node.left;
        }

        return node;
    }

    findMaxNode(node) {
        while(node && node.right !== null) {
            node = node.right;
        }

        return node;
    }

    removeNode(node,element){
      if(node===null){
        return null;
      }
      this.parentNode=node;

      if(element<node.key){
        node.left=this.removeNode(node.left,element);
      }else{
        this.nodeToBeDeleted=node;
        node.right=this.removeNode(node.right,element);
      }

      if(node===this.parentNode){
        if(this.nodeToBeDeleted!==null&&element===this.nodeToBeDeleted.key){
          if(this.nodeToBeDeleted===this.parentNode){
            node=node.left;
          }else{
            var tmp=this.nodeToBeDeleted.key;
            this.nodeToBeDeleted.key=this.parentNode.key;
            this.parentNode.key=tmp;
            node=node.right;
          }
        }
      }else{

        if(node.left===undefined)node.left=null;
        if(node.right===undefined)node.right=null;

        if((this.heightNode(node.left)-this.heightNode(node.right))===2){
          if(element<node.left.key){
            node=this.rotationLR(node);
          }else{
            node=this.rotationLL(node);
          }
        }

        if((this.heightNode(node.right)-this.heightNode(node.left))===2){
          if(element>node.right.key){
            node=this.rotationRL(node);
          }else{
            node=this.rotationRR(node);
          }
        }
      }

      return node;
    };

    remove(element){
      this.parentNode=null;
      this.nodeToBeDeleted=null;
      this.root=this.removeNode(this.root,element);
    };

    Delete(node,element){
      if(node === null) {
          return null;
      }else if(element < node.key) {
          node.left = this.Delete(node.left, element);
      }else if(element > node.key) {
          node.right = this.Delete(node.right, element);
      }else if(node.left && node.right) {
          var tmp=this.findMinNode(node.right);
          node.key=tmp.key;
          node.right=this.Delete(node.right,node.key)
      }else{
        if(node.left&&node.right===null){
          var tmp=this.findMaxNode(node.left);
          node.key=tmp.key;
          node.left=this.Delete(node.left,node.key);
        }
        else if(node.right&&node.left===null){
          var tmp=this.findMinNode(node.right);
          node.key=tmp.key;
          node.right=this.Delete(node.right,node.key);
        }
        else{
          node=null;
        }
      }
      if(node){

          if((this.heightNode(node.left) - this.heightNode(node.right)) === 2) {
            if(element < node.left.key) {
                node = this.rotationLR(node);
            } else {
                node = this.rotationLL(node);
            }
        }

        if((this.heightNode(node.right) - this.heightNode(node.left)) === 2) {
            if(element > node.right.key) {
                node = this.rotationRL(node);
            } else {
                node = this.rotationRR(node);
            }
        }

      }

      return node;
    };//另一种删除的写法,更直观

    del(element){
      this.root = this.Delete(this.root, element);
    };

    inOrderTraverse(callback) {//通过中序遍历方式遍历所有节点
        this.inOrderTraverseNode(this.root, callback);
    };

    inOrderTraverseNode(node, callback) {
        if(node !== null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node);
            this.inOrderTraverseNode(node.right, callback);
        }
    };

  }
  return AVLTree;
})()
