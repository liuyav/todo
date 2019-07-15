## 匹配规则
1. * : 匹配该路径段中0个或多个任意字符
2. ? : 匹配该路径段中1个任意字符
3. [] : 匹配该路径段中在指定范围内的一个字符
4. *(pattern|pattern|pattern) : 匹配括号中多个模型的0个或多个或任意个的组合(ps: | 前后不能有空格)
5. !(pattern|pattern|pattern) : 匹配不包含任何模型
6. ?(pattern|pattern|pattern) : 匹配多个模型中的0个或任意1个
7. @(pattern|pat*|pat?erN) : 匹配多个模型中的任意1个
8. +(pattern|pattern|pattern) : 匹配多个模型中的1个或多个