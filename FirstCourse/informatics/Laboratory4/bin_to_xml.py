with open('schedule.bin', 'rb') as f:
    binary_data = f.read()



def parse_to_normal(data,i):
    type = data[i]
    if type == 1:
        len_object = data[i+1]
        len_name = data[i+2]
        name = ''
        i+=3
        name += data[i:i + len_name].decode('utf-8')
        elements = [0]*len_object
        i = i + len_name
        for j in range(len_object):
            elements[j],i = parse_to_normal(data,i)
        return ['object', name , elements],i
    elif type == 2:
        len_array = data[i + 1]
        len_name = data[i + 2]
        name = ''
        i += 3
        name += data[i:i + len_name].decode('utf-8')
        elements = [0] * len_array
        i = i + len_name
        for j in range(len_array):
            elements[j], i = parse_to_normal(data, i)
        return ['array', name, elements],i
    elif type == 3:
        type_key = data[i+1]
        len_key = data[i+2]
        i += 3
        key = data[i:i + len_key].decode('utf-8')
        i = i + len_key
        type_value = data[i]
        if type_value == 4:
            len_value = data[i + 1]
            i += 2
            value = data[i:i + len_value].decode('utf-8')
            i = i + len_value
            type_value = 'string'
        elif type_value == 5:
            i+=1
            number_bytes = data[i:i + 4]
            value = int.from_bytes(number_bytes, 'big')
            i+=4
            type_value = 'number'
        return  ['keys', key, type_value, value],i
    else:
        return None, i + 1
#print(parse_to_normal(binary_data,0))

def to_xml(data, k):
    line=''
    type = data[0]
    if type == 'object' or type == 'array':
        name = data[1]
        line += '  '*k + f'<{name}> \n'
        for i in range(len(data[2])):
            line = line + to_xml(data[2][i],k+1)
        line += '  ' * k + f'</{name}> \n'
        return line
    else:
        return '  '*k + f'<{data[1]}> {data[3]} </{data[1]}> \n'
data,i = parse_to_normal(binary_data,0)
print(to_xml(data,0))
