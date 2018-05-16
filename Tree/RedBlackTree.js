let RedBlackTree = (function() {
    let Colors = {
        RED: 0,
        BLACK: 1
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
        }//右旋

        rotateRight(node) {
            var temp = node.left;
            if(temp !== null) {
                node.left = temp.right;
                temp.right = node;
                temp.color = node.color;
                node.color = Colors.RED;
            }
            return temp;
        }//左旋

        min() {//返回二叉树中最小的键值
            return this.minNode(this.root);
        }

        minNode(node) {
            if(node) {
                while(node && node.left !== null) {
                    node = node.left;
                }

                return node.key;
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

                return node.key;
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

        var newNode = node;

        if(!this.isRed(node.left) && this.isRed(node.right)){
          newNode=this.rotateLeft(node);
        }

        if(this.isRed(node.left)&&this.isRed(node.left.left)){
          newNode=this.rotateRight(node);
        }

        if(this.isRed(node.left)&&this.isRed(node.right)){
          newNode=this.flipColors(node);
        }

        return newNode;
      }//修复红色右节点

      moveRedRight(node){
        this.flipColors(node);
        if(this.isRed(node.left.left)){
          node=this.rotateLeft(node);
          this.flipColors(node);
        }
        return node;
      }

      moveRedLeft(node){
        this.flipColors(node);
        if(this.isRed(node.right.left)){
          node.right=this.rotateRight(node.right);
          node=this.rotateLeft(node);
          this.flipColors(node);
        }//判断兄弟节点的左孩子是否为红,若是则当前节点德父节点进行左右旋转且颜色转换
        return node;
      }

      removeMin(node){
        if(node.left===null){
          return null;
        }

        var newNode = node;

        if (!this.isRed(node.left) && !this.isRed(node.left.left)){
          node=this.moveRedLeft(node);
        }

        node.left=this.removeMin(node.left);

        if(this.isRed(node.right) && !this.isRed(node.left)) {
            newNode = this.rotateLeft(node);
        }

        if(this.isRed(node.left) && this.isRed(node.left.left)) {
            newNode = this.rotateRight(node);
        }
        if(this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node);
        }

        return newNode;
      }

      removeMax(node){

        var newNode=node;

        if(this.isRed(node.left))
          node=this.rotateLeft(node);

        if(node.right===null){
          return null;
        }

        if(!this.isRed(node.right) && !this.isRed(node.right.left)){
          node=this.moveRedLeft(node);
        }

        node.right=this.removeMax(node.right);

        if (!this.isRed(node.left) && !this.isRed(node.left.left)){
          node=this.moveRedLeft(node);
        }

        if(this.isRed(node.right) && !this.isRed(node.left)) {
            newNode = this.rotateLeft(node);
        }

        if(this.isRed(node.left) && this.isRed(node.left.left)) {
            newNode = this.rotateRight(node);
        }
        if(this.isRed(node.left) && this.isRed(node.right)) {
            this.flipColors(node);
        }

        return newNode;
      }

      delMin(){
        return this.removeMin(this.root);
      }

      delMax(){
        return this.removeMax(this.root);
      }

      removeNode(node,element){
        if(element<node.key){
          if(!this.isRed(node.left)&&!this.isRed(node.right)){
            node=this.moveRedLeft(node);
          }
          node.left=this.removeNode(node.left,element);
        }
      }

      remove(element){
        this.root=removeNode(this.root,element);
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

rbTree.delMax();
console.log(rbTree.max());
