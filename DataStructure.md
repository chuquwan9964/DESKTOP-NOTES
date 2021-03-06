## Data Structure&Algorithm

#### 树

##### 概念

​	节点的高度：该节点到其最远的树叶的距离

​	节点的深度：该节点与根的距离（根节点的深度为0）

​	树的高度：树的叶子结点的最大深度

​	树的深度：等同于树的高度

​	具有N个节点的树一共有N-1条链(因为我们可以把链想象成节点连向父节点的指针，而整棵树的根节点没有父节点，所以总共有N - 1条链)

##### 二叉树

​	具有N个节点的二叉树具有N+1个NULL指针(想想为什么)

​		因为每个节点有两个指针(指向left和right)，而具有N个节点的二叉树具有N-1个非空指针，所以就有2*N - N + 1 = N + 1个空指针

​	已知二叉树的前序遍历和中序遍历可以唯一确定二叉树

​	已知二叉树的后序遍历和中序遍历可以唯一确定二叉树

​	但是已知二叉树的后序遍历和前序遍历无法唯一确定二叉树，因为虽然我们可以确定根节点，但是我们无法确定根节点的子节点是左孩子还是右孩子，比如：

​		后序遍历为BA，先序遍历为AB，虽然我们可以确定跟为A，但是我们无法确定B是在A的左边还是右边

##### 二叉搜索树