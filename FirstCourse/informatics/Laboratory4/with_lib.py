def create_tokens(text):
    tokens = []
    i=0
    while i < len(text):
        s = text[i] #s - символ
        if s.isspace(): i+=1
        elif s == ':':
            tokens.append(('двоеточ', ':'))
            i += 1
        elif s == ',': i += 1
        elif s == "(":
            tokens.append(['лскоб','('])
            i+=1
        elif s == ")":
            tokens.append(['пскоб',')'])
            i+=1
        elif s.isdigit():
            j = i
            while j < len(text) and text[j].isdigit(): j+=1
            tokens.append(['число',int(text[i:j])])
            i = j
        elif s == '"':
            j = i +1
            while j < len(text) and text[j]!='"': j+=1
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
            while j < len(text) and text[j] not in ':(': j+=1
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
            return [name, object], tokens

        elif tokens[0][0] == 'имя' and tokens[1][0] == 'двоеточ' and tokens[2][0] != 'квлвск':
            type_key,key = tokens[0]
            type_value,value = tokens[2]
            tokens = tokens[3:]
            return [key,value], tokens

        elif tokens[0][0] == 'имя' and tokens[1][0] == 'двоеточ' and tokens[2][0] == 'квлвск':
            array = []
            name = tokens[0][1]
            tokens = tokens[2:]
            while tokens and tokens[0][0] != "квпрск" :
                item, tokens = read_and_conversion(tokens)
                if item: array.append(item)
            return [name, array], tokens[1:]
        return None, tokens[1:]

import pickle
with open('input.ron', 'r', encoding='utf-8') as f:
    text = f.read()
token = create_tokens(text)
structure , tokens = read_and_conversion(token)

with open('data.pkl', 'wb') as f:
    pickle.dump(structure, f)


with open('data.pkl', 'rb') as f:
    loaded_structure = pickle.load(f)


import configparser


def convert_schedule_to_ini(schedule_data):
    config = configparser.ConfigParser()

    # Основная секция
    config['Schedule'] = {}
    days = schedule_data[1][0][1]
    for day in days:
        day_data = day[1]
        day_name = day_data[0][1]
        config[day_name] = {'day_name': day_name}

        lessons = day_data[1][1]
        for i, lesson in enumerate(lessons, 1):
            lesson_data = lesson[1]
            lesson_section = f"{day_name}.lesson{i}"
            config[lesson_section] = {}

            # Обрабатываем каждый атрибут урока
            for attr in lesson_data:
                key = attr[0].strip()  # Убираем пробелы
                value = attr[1]
                if key == 'time':
                    # Время обрабатываем отдельно
                    start_time = attr[1][1][0][1]
                    end_time = attr[1][1][1][1]
                    config[lesson_section]['start'] = start_time
                    config[lesson_section]['end'] = end_time
                else:
                    config[lesson_section][key] = str(value)

    return config


# Использование
config = convert_schedule_to_ini(loaded_structure)
line = ''
# Вывод результата
for section in config.sections():
    line+= f"[{section}] \n"
    for key, value in config[section].items():
        line+=f"{key} = {value} \n"
    line+=f'\n'
print(line)