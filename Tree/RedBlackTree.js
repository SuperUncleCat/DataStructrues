let RedBlackTree = (function() {
    let Colors = {
        RED: false,
        BLACK: true
    };

    class Node {
        constructor(key, color) {
            this.key = key;
            this.left = null;
            this.right = null;
            this.color = color;

            this.flipColor = function() {
                if(this.color === Colors.RED) {
                    this.color = Colors.BLACK;
                } else {
                    this.color = Colors.RED;
                }
            };
        }
    }

    class RedBlackTree {
        constructor() {
            this.root = null;
        }

        getRoot() {
            return this.root;
        }

        isRed(node) {
            if(!node) {
                return false;
            }
            return node.color === Colors.RED;
        }

        flipColors(node) {
            // node.flipColor();
            // node.left.flipColor();
            // node.right.flipColor();
            node.color = !node.color;
            node.left.color = !node.left.color;
            node.right.color = !node.right.color;
        }

        rotateLeft(node) {
            var temp = node.right;
            if(temp !== null) {
                node.right = temp.left;
                temp.left = node;
                temp.color = node.color;
                node.color = Colors.RED;
            }
            return temp;
        }//左旋 对具有任意右孩子节点进行 旋转以后x的右孩子y取代了x,而x成为y的左孩子,y的左孩子成为x的右孩子

        rotateRight(node) {
            var temp = node.left;
            if(temp !== null) {
                node.left = temp.right;
                temp.right = node;
                temp.color = node.color;
                node.color = Colors.RED;
            }
            return temp;
        }//右旋 对具有任意左孩子节点进行 旋转以后结点x被左孩子y替换,x成为y的右儿子,y的右孩子成为x的左孩子 这是一个中间操作 后面会通过右旋而颜色转换修复

        min() {//返回二叉树中最小的键值
            return this.minNode(this.root);
        }

        minNode(node) {
            if(node) {
                while(node && node.left !== null) {
                    node = node.left;
                }

                return node;
            }
            return null;
        }

        max() {//返回二叉树中最大的键值
            return this.maxNode(this.root);
        }

        maxNode(node) {
            if(node) {
                while(node && node.right !== null) {
                    node = node.right;
                }

                return node;
            }
            return null;
        }


        searchNode(node,key){
          if(node===null){
            return false;
          }
          if(key < node.key) {
              return this.searchNode(node.left, key);

          } else if(key > node.key) {
              return this.searchNode(node.right, key);

          } else {
              return node.key;
          }
        }

        search(key){
          return this.searchNode(this.root, key);
        }

        insertNode(node, element) {

            if(node === null) {
                return new Node(element, Colors.RED);
            }

            var newRoot = node;

            if(element < node.key) {

                node.left = this.insertNode(node.left, element);

            } else if(element > node.key) {

                node.right =this.insertNode(node.right, element);

            } else {
                node.key = element;//覆盖相同的值
            }

            if(this.isRed(node.right) && !this.isRed(node.left)) {
                newRoot = this.rotateLeft(node);
            }

            if(this.isRed(node.left) && this.isRed(node.left.left)) {
                newRoot = this.rotateRight(node);
            }
            if(this.isRed(node.left) && this.isRed(node.right)) {
                this.flipColors(node);
            }

            return newRoot;
      }

      insert(element) {
          this.root = this.insertNode(this.root, element);
          this.root.color = Colors.BLACK;
      }

      fixUp(node){
        if(this.isRed(node.right) && !this.isRed(node.left)) {
            node = this.rotateLeft(node);
        }

        if(this.isRed(node.left) && this.isRed(node.left.left)) {
            node = this.rotateRight(node);
        }
        if(this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node);
        }

        return node;
      }

      moveRedRight(node){
        this.flipColors(node);
        if(this.isRed(node.left.left)){
          node=this.rotateRight(node);
          this.flipColors(node);
        }
        return node;
      }

      moveRedLeft(node){
        this.flipColors(node);
        if(this.isRed(node.right.left)){
          node.right=this.rotateRight(node.right);//旋转以后结点x被左孩子y替换,x成为y的右儿子,y的右孩子成为x的左孩子 这是一个中间操作 后面会通过左旋而颜色转换修复
          node=this.rotateLeft(node);//旋转以后x的右孩子y取代了x,而x成为y的左孩子,y的左孩子成为x的右孩子
          this.flipColors(node);
        }//判断兄弟节点的左孩子是否为红,若是则当前节点的父节点进行左右旋转且颜色转换
        return node;
      }

      removeMin(node){

        if(node.left===null){
          return null;
        }

        if (!this.isRed(node.left) && !this.isRed(node.left.left)){
          node=this.moveRedLeft(node);
        }

        node.left=this.removeMin(node.left);

        if(this.isRed(node.right) && !this.isRed(node.left)) {
            node = this.rotateLeft(node);
        }

        if(this.isRed(node.left) && this.isRed(node.left.left)) {
            node = this.rotateRight(node);
        }
        if(this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node);
        }

        return node;
      }

      removeMax(node){

        //使树出现红色右链接
        if(this.isRed(node.left))
          node=this.rotateRight(node);

        if(node.right===null){
          return null;
        }

        if(!this.isRed(node.right) && !this.isRed(node.right.left)){
          node=this.moveRedLeft(node);
        }

        node.right=this.removeMax(node.right);

        return this.fixUp(node);
      }

      removeNode(node,element){

        if(element<node.key){
          if(!this.isRed(node.left)&&!this.isRed(node.left.left)){
            node=this.moveRedLeft(node);
          }
          node.left=this.removeNode(node.left,element);
        }else{
          //确保在右子树中能出现红色右孩子
          if(this.isRed(node.left)){
            node=this.rotateRight(node);
          }

          //待删除的节点在树底
          if(element===node.key&&node.right===null){
            return null;
          }
          //待删除的节点不在树底
          if(element===node.key){
            var temp=this.minNode(node.right);
            node.key=temp.key;
            node.right=this.removeMin(node.right);
          }else{

            if(!this.isRed(node.right)&&!this.isRed(node.right.left)){
              node=this.moveRedRight(node);
            }
            node.right=this.removeNode(node.right,element);
          }
        }

        return this.fixUp(node);
      }

      remove(element){
        if(element===null){
          return null;
        }

        if(!this.isRed(this.root.left)&&!this.isRed(this.root.right)){
          this.root.color=Colors.RED;
        }
        this.root=this.removeNode(this.root,element);
        this.root.color=Colors.BLACK;
      }

      deleteNode(node,element){
        if(node === null) {
            return null;
        }else if(element < node.key) {
          if(!this.isRed(node.left)&&!this.isRed(node.right)){
            node=moveRedLeft(node);
          }
          node.left = this.deleteNode(node.left, element);
        }else if(element > node.key) {
          if(!this.isRed(node.right)&&!this.isRed(node.right.left)){
            node=this.moveRedRight(node);
          }
          node.right = this.deleteNode(node.right, element);
        }else if(node.left && node.right) {
            var tmp=this.minNode(node.right);
            node.key=tmp.key;
            node.right=this.removeMin(node.right)
        }else{
          if(node.left&&node.right===null){
            var tmp=this.maxNode(node.left);
            node.key=tmp.key;
            node.left=this.removeMax(node.left);
          }
          else if(node.right&&node.left===null){
            var tmp=this.minNode(node.right);
            node.key=tmp.key;
            node.right=this.removeMin(node.right);
          }
          else{
            node=null;
          }
        }

        return this.fixUp(node);
      }

      delete(element){
        if(element===null){
          return null;
        }

        if(!this.isRed(this.root.left)&&!this.isRed(this.root.right)){
          this.root.color=Colors.RED;
        }
        this.root=this.removeNode(this.root,element);
        this.root.color=Colors.BLACK;
      }

  }
  return RedBlackTree;
})()

var rbTree = new RedBlackTree();

rbTree.insert(1);
rbTree.insert(2);
rbTree.insert(3);
rbTree.insert(4);
rbTree.insert(5);
rbTree.insert(6);
rbTree.insert(7);
rbTree.insert(14);
rbTree.insert(15);
rbTree.insert(13);
rbTree.insert(12);
rbTree.insert(11);

// rbTree.remove(1);
// rbTree.remove(2);
// rbTree.remove(15);
// rbTree.remove(14);

rbTree.delete(1);
rbTree.delete(2);
rbTree.delete(15);
rbTree.delete(14);
// console.log(rbTree.max());
// console.log(rbTree.min());
console.log(rbTree.getRoot());
