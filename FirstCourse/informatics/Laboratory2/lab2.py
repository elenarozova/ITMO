mes = input()
mistake=-1
s1 = ((int(mes[0])+int(mes[2])+int(mes[4])+int(mes[6]))%2) == 0
s2 = ((int(mes[1])+int(mes[2])+int(mes[5])+int(mes[6]))%2) == 0
s3 = ((int(mes[3])+int(mes[5])+int(mes[4])+int(mes[6]))%2) == 0
if s1 == 0 :mistake+=1
if s2 == 0 :mistake+=2
if s3 == 0 :mistake+=4
if s1+s2+s3 == 3:
    print(mes, ' правильное сообщение')
else:
    right_mes = mes[:mistake] + str(int(not(bool(int(mes[mistake]))))) + mes[mistake+1:]
    print(right_mes, ' ошибка в бите номер ',mistake+1)