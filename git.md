## git

##### git init

```bash
cd /some_project
git init 
```



##### git clone

```bash
cd /some_project
git clone url [new_name]	# new_name 是克隆下来自己想给目录取得名字，可以省略，默认就是克隆的项目的名字
```



##### git add

> 添加到暂存区被称之为stage(组织)，一个文件如果是staged的，那就是在暂存区里的

```bash
git add file_name
```



##### git diff

​	--staged	查看已经提交到暂存区(staged area)但并没有commit的文件

​	--cached	同上

> 查看修改的文件的差异(这个文件在暂存区(staging area)，后来修改了一下，那么暂存区的内容和working tree的内容肯定不一致，此命令查看不一致的地方)

```bash
$ git diff
warning: LF will be replaced by CRLF in abc.
The file will have its original line endings in your working directory.
diff --git a/abc b/abc
index 3b18e51..10bda51 100644
--- a/abc
+++ b/abc
@@ -1 +1,2 @@
 hello world
+hello world

```



##### git commit

​	-a	自动提交已经修改的unstaged的文件

```bash
git commit -m 'comment'
```



##### git rm

​	--cached	保留文件，但不继续tracked

​	-f			强制删除(当本地仓库的文件与working tree的文件内容不同时，强制删除)



##### git ls-files

​	-c 	cached		列出staged area的文件(default)

​	-s	staged 		列出staged area的文件，并且stage number也打印出来

```bash
$ git ls-files -s
100644 ba45093d8f20e8b050655557992d107e671dc355 0       HelloProjet/.gitignore
100644 fb8e8667171815867fbacb554654715987d224b0 0       HelloProjet/HelloProjet.iml
100644 1420815611588dceb49a438f987be5c1cbe6a320 0       HelloProjet/lib/junit-4.9.jar
100644 cbefef917555aacde207b1623c33cc79021d3c66 0       HelloProjet/src/Main.java
100644 10bda51843e912c86901eea164d0b3f7c9a56df3 0       abc
100644 d6abd6d543dc29840b67b0a9ded9f1c119ddbe6b 0       hello.txt
```



##### git ls-tree 

​	ls -tree [args] `分支或指针`	

​	 git ls-tree HEAD -r		等价于		 git ls-tree master -r	(当HEAD指向master的时候)

​	列出给定的指针(	==当前最后一次提交仓库==)的文件内容

​	何为指针？每次提交都会创建一个快照，也会创建一个指针指向此快照，我们可以利用此指针回退版本

​	HEAD指针默认指向最新的快照

​	-r	递归列出所有

```bash
$ git ls-tree HEAD -r
100644 blob ba45093d8f20e8b050655557992d107e671dc355    HelloProjet/.gitignore
100644 blob fb8e8667171815867fbacb554654715987d224b0    HelloProjet/HelloProjet.iml
100644 blob 1420815611588dceb49a438f987be5c1cbe6a320    HelloProjet/lib/junit-4.9.jar
100644 blob cbefef917555aacde207b1623c33cc79021d3c66    HelloProjet/src/Main.java
100644 blob d6abd6d543dc29840b67b0a9ded9f1c119ddbe6b    hello.txt

#等价于下面的

$ git ls-tree master -r
100644 blob ba45093d8f20e8b050655557992d107e671dc355    HelloProjet/.gitignore
100644 blob fb8e8667171815867fbacb554654715987d224b0    HelloProjet/HelloProjet.iml
100644 blob 1420815611588dceb49a438f987be5c1cbe6a320    HelloProjet/lib/junit-4.9.jar
100644 blob cbefef917555aacde207b1623c33cc79021d3c66    HelloProjet/src/Main.java
100644 blob d6abd6d543dc29840b67b0a9ded9f1c119ddbe6b    hello.txt

```



##### git reset

​	git reset 版本 [args]

​	--soft

​	--mixed

​	--hard

```bash
git reset --hard HEAD^	# 回退到上一个版本
git reset --hard HEAD^^	# 回退到前两个版本
```







##### git remote add

​	添加远程仓库地址

​	git remote add 	\<shortname\>      \<url\>





##### git fetch

​	git fetch 	\<remote_alias\>

​	必须注意 	`git fetch` 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

​	这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

```bash
$ git fetch pb
remote: Counting objects: 43, done.
remote: Compressing objects: 100% (36/36), done.
remote: Total 43 (delta 10), reused 31 (delta 5)
Unpacking objects: 100% (43/43), done.
From https://github.com/paulboone/ticgit
 * [new branch]      master     -> pb/master
 * [new branch]      ticgit     -> pb/ticgit
```

##### git pull

##### git push

​	git push 	\<remote_address\>	\<branch_name\>

```bash
git push origin --delete serverfix	# 删除远程服务器的分支
```





##### git remote rename

​	git remote rename		\<old_name\>	\<new_name\>



##### git remote show 

​	git remote show \<remote_alias\>

​	这个命令列出了当你在特定的分支上执行 `git push` 会自动地推送到哪一个远程分支。 它也同样地列出了哪些远程分支不在你的本地，哪些远程分支已经从服务器上移除了， 还有当你执行 `git pull` 时哪些本地分支可以与它跟踪的远程分支自动合并。

```bash
$ git remote show origin
* remote origin
  Fetch URL: https://github.com/chuquwan9964/project1.git
  Push  URL: https://github.com/chuquwan9964/project1.git
  HEAD branch: master
  Remote branch:
    master tracked
  Local branch configured for 'git pull':
    master merges with remote master
  Local ref configured for 'git push':
    master pushes to master (fast-forwardable)
```



##### git remote remove

​	删除远程地址

​	git remote remove	\<remote_alias\>





##### git tag	

​	git tag 	\[args\][tag_name]

​	-l	列出

​	-d 	删除



```bash

$ git tag -l	#显示当前的标签
v1.0
```





```bash
git tag v1.0	#打一个标签
```



```bash
git push origin v1.0	#将1.0标签推送到远程仓库

git push origin --tags	#推送当前所有的标签到远程仓库
```





##### git branch

​	git branch  [argument]   \[branch_name\]

​	-d	branch_name	删除分支

​	--merge			查看已经合并到当前分支的分支

​	--no-merge			查看没有合并到当前分支的分支

​	--no-ff				不使用fast-forward合并分支，而是创建一个新的提交

​	-m	old_name	new_name		改名



##### git merge

​	git merge branch_name	将指定分支合并到当前HEAD指向的分支



##### git checkout

​	git checkout	[argument]	\[branch_name\]

​	-b	branch_name	此命令相当于:	git branch 与git checkout

```bash
$ git checkout -b iss53	#相当于下面的两条命令

$ git branch iss53
$ git checkout iss53
```



##### git stash

​	临时保存工作现场，因为在一个branch中如果有未tracked的文件，这个时候如果我们需要切换到其他分支进行工作时，是不能切换的，所以需要临时保存现场

​	list						列出所有的保存信息列表

​	save	comment		保存当前的工作进度至信息列表					

​	pop					取出第一个保存的信息，并且从列表删除

​	apply [stash@{n}]		应用列表中的第几个信息，不会从列表删除

​	drop stash@{n}		删除列表中的第几个信息(begin from 0)



```bash
git stash	# 直接就可以保存
git stash save 'save1'	# 取个名字保存
git pop		# 取出
git apply stash@{0}	# 取出第0个信息
git drop stash@{0}	# 删除第0个信息
```



##### git blame

​	blame(责任)

​	git blame file_name

​	显示此文件的所有修改记录





##### git diff

​	什么参数都不加，默认显示工作区与暂存区的文件差异

​	git diff commit_id				比较工作区和版本库(提交区)的差异

​	git diff --cached commit_id	比较暂存区与版本库(提交区)的差异

