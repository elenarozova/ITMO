# функция,распледеляющая код разметки на тип и значиния в нём

def create_tokens(text):
    tokens = []
    i=0
    while i < len(text):
        s = text[i] #s - символ
        if s.isspace():
            i+=1
        elif s == ':':
            tokens.append(('двоеточ', ':'))
            i += 1
        elif s == ',':
            i += 1
        elif s == "(":
            tokens.append(['лскоб','('])
            i+=1
        elif s == ")":
            tokens.append(['пскоб',')'])
            i+=1
        elif s.isdigit():
            j = i
            while j < len(text) and text[j].isdigit():
                j+=1
            tokens.append(['число',int(text[i:j])])
            i = j
        elif s == '"':
            j = i +1
            while j < len(text) and text[j]!='"':
                j+=1
            tokens.append(['текст',text[i+1:j]])
            i = j + 1
        elif s == "[":
            tokens.append(['квлвск',"["])
            i+=1
        elif s == "]":
            tokens.append(['квпрск',"]"])
            i+=1

        elif s.isalpha():
            j = i
            while j < len(text) and text[j] not in ':(':
                j+=1
            tokens.append(['имя',text[i:j]])
            i = j
        else: i+=1
    return tokens



def read_and_conversion(tokens):
    while tokens:
        if tokens[0][0] == 'имя' and tokens[1][0] == 'лскоб':
            object = []
            name = tokens[0][1]
            tokens = tokens[2:]
            while tokens and tokens[0][0] != "пскоб":
                item, tokens = read_and_conversion(tokens)
                if item: object.append(item)
            tokens = tokens[1:]
            return ['object', name, object], tokens

        elif tokens[0][0] == 'имя' and tokens[1][0] == 'двоеточ' and tokens[2][0] != 'квлвск':
            type_key,key = tokens[0]
            type_value,value = tokens[2]
            tokens = tokens[3:]
            return ['keys', type_key, key, type_value, value], tokens

        elif tokens[0][0] == 'имя' and tokens[1][0] == 'двоеточ' and tokens[2][0] == 'квлвск':
            array = []
            name = tokens[0][1]
            tokens = tokens[2:]
            while tokens and tokens[0][0] != "квпрск" :
                item, tokens = read_and_conversion(tokens)
                if item: array.append(item)
            return ['array', name, array], tokens[1:]
        return None, tokens[1:]

def to_binar(struc):
    binar = ''
    if struc[0] == 'object':
        name = struc[1].encode('utf-8')
        binar+=f'1 {len(struc[2])} {len(name)} {" ".join(str(b) for b in name)} '
        for i in struc[2]:
            binar = binar + to_binar(i)
    elif struc[0] == 'array':
        name = struc[1].encode('utf-8')
        binar += f'2 {len(struc[2])} {len(name)} {" ".join(str(b) for b in name)} '
        for i in struc[2]:
            binar = binar + to_binar(i)
    elif struc[0] == 'keys':
        key = struc[2].encode('utf-8')
        binar += f'3 4 {len(key)} {" ".join(str(b) for b in key)} '
        if struc[3] == 'текст':
            value = struc[4].encode('utf-8')
            binar = binar + f'4 {len(value)} {" ".join(str(b) for b in value)} '
        else:
            binar += '5 '
            for byte in struc[4].to_bytes(4, 'big'):
                binar += f'{byte} '
    return binar

with open('input.ron', 'r', encoding='utf-8') as f:
    text = f.read()
tokens = create_tokens(text)
print(tokens)
structure, tokens = read_and_conversion(tokens)

binary_string = to_binar(structure)
numbers = [int(x) for x in binary_string.split()]



binary_numbers = [int(x) for x in to_binar(structure).split()]
binary_bytes = bytes(binary_numbers)
print(binary_bytes)
with open('schedule.bin', 'wb') as f:
    f.write(binary_bytes)


print(structure)