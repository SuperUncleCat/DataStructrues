function getAvlTreeHeight(node){
  if(node==null){
    return 0;
  }else{
    var leftHeight=getAvlTreeHeight(node.left);
    var rightHeight=getAvlTreeHeight(node.right);
    return (leftHeight>rightHeight?leftHeight:rightHeight)+1;
  }
}

function balance(node){
  if(node==null){
    return node;
  }

  if((getAvlTreeHeight(node.left)-getAvlTreeHeight(node.right))>1){
    if(getAvlTreeHeight(node.left.left)>=getAvlTreeHeight(node.left.right)){
      node=roateRight(node);
    }else{
      node=roateLeft(node);
    }
  }else if((getAvlTreeHeight(node.right)-getAvlTreeHeight(node.left))>1){
    if(getAvlTreeHeight(node.right.right)>=getAvlTreeHeight(node.right.left)){
      node=roateLeft(node);
    }else{
      node=rotateLeftRight
    }
  }
}

let BinarySearchTree = (function() {
    class Node {
        constructor(key) {
            this.key = key;
            this.left = null;
            this.right = null;
        }
    }

    class BinarySearchTree {
        constructor() {
            this.root = null;
        }

        insert(key) {//向二叉树插入一个新的键
            var newNode = new Node(key);

            if(this.root === null) {
                this.root = newNode;
            } else {
                this.insertNode(this.root, newNode);
            }
        }

        insertNode(node, newNode) {
            if(newNode.key < node.key) {
                if(node.left === null) {
                    node.left = newNode;
                } else {
                    this.insertNode(node.left, newNode);
                }
            } else {
                if(node.right === null) {
                    node.right = newNode;
                } else {
                    this.insertNode(node.right, newNode);
                }
            }
        }

        getRoot() {//获取根节点
            return this.root;
        }

        search(key) {//在二叉树查找一个键，如果节点存在，则返回true；如果不存在，则返回false。
            return this.searchNode(this.root, key);
        }

        searchNode(node, key) {
            if(node === null) {
                return false;
            }

            if(key < node.key) {
                return this.searchNode(node.left, key);

            } else if(key > node.key) {
                return this.searchNode(node.right, key);

            } else {
                return true;
            }
        }

        inOrderTraverse(callback) {//通过中序遍历方式遍历所有节点
            this.inOrderTraverseNode(this.root, callback);
        }

        inOrderTraverseNode(node, callback) {
            if(node !== null) {
                this.inOrderTraverseNode(node.left, callback);
                callback(node.key);
                this.inOrderTraverseNode(node.right, callback);
            }
        }

        preOrderTraverse(callback) {//通过先序遍历方式遍历所有节点。
            this.preOrderTraverseNode(this.root, callback);
        }

        preOrderTraverseNode(node, callback) {
            if(node !== null) {
                callback(node.key);
                this.preOrderTraverseNode(node.left, callback);
                this.preOrderTraverseNode(node.right, callback);
            }
        }

        postOrderTraverse(callback) {//通过后序遍历方式遍历所有节点。
            this.postOrderTraverseNode(this.root, callback);
        }

        postOrderTraverseNode(node, callback) {
            if(node !== null) {
                this.postOrderTraverseNode(node.left, callback);
                this.postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        }

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

        remove(element) {//从书中移除某个键
            this.root = this.removeNode(this.root, element);
        }

        findMinNode(node) {
            while(node && node.left !== null) {
                node = node.left;
            }

            return node;
        }

        removeNode(node, element) {

            if(node === null) {
                return null;
            }

            if(element < node.key) {
                node.left = this.removeNode(node.left, element);
                return node;

            } else if(element > node.key) {
                node.right = this.removeNode(node.right, element);
                return node;

            } else {

                if(node.left === null && node.right === null) {
                    node = null;
                    return node;
                }


                if(node.left === null) {
                    node = node.right;
                    return node;

                } else if(node.right === null) {
                    node = node.left;
                    return node;
                }


                var aux = this.findMinNode(node.right);
                node.key = aux.key;
                node.right = this.removeNode(node.right, aux.key);
                return node;
            }
        };

    }
    return BinarySearchTree;
})()

var tree=new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
tree.insert(2);
tree.insert(4);

var height=getAvlTreeHeight(tree);
console.log(height);
