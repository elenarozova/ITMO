print("Введите число")
num = int(input())
Fib = [1, 1]
for i in range(2,200):
    Fib.append(Fib[i - 1] + Fib[i - 2])
Fib = Fib[1:]
def maxFibNum(num):
    for i in range(1, len(Fib)):
        if num < Fib[i] and num >= Fib[i - 1]:
            return i

def per(num):
    remains = num
    number = ['0' for i in range(maxFibNum(num))]
    while remains != 0:
        number[maxFibNum(remains) - 1] = '1'
        remains = remains % Fib[maxFibNum(remains) - 1]
    number.reverse()
    return ''.join(number)

print(f'Число {num} в десятичной системе счисления равно {per(num)} в системе счисления фибоначчи.')

