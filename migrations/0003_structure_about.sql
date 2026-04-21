-- Board members table
CREATE TABLE IF NOT EXISTS board_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Union members table
CREATE TABLE IF NOT EXISTS union_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  ogrn TEXT NOT NULL,
  website TEXT,
  position TEXT NOT NULL,
  director TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- About documents table (section: 'documents' or 'join')
CREATE TABLE IF NOT EXISTS about_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL CHECK(section IN ('documents','join')),
  title TEXT NOT NULL,
  file_key TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('view','download')),
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- Seed: board members
INSERT INTO board_members (name, position, sort_order) VALUES
  ('Кондратьева Виктория Ивановна', 'Президент ОМОР Союз Экологов России, председатель Правления', 1),
  ('Прокофьев Сергей Анатольевич', 'Вице-президент ОМОР Союз Экологов России, член правления', 2),
  ('Плямина Ольга Владимировна', 'Член правления', 3),
  ('Винс Константин Петрович', 'Член правления', 4),
  ('Чернышев Владимир Владимирович', 'Член правления', 5);

-- Seed: union members
INSERT INTO union_members (name, address, ogrn, website, position, director, sort_order) VALUES
  ('ФГБУ «ГосНИИЭНП»', '123242, г. Москва, ул. Садовая-Кудринская, д. 11, стр. 1, ком. 2П-1', '1026402656895', 'www.promeco-inst.ru', 'Директор', 'Кондратьева Виктория Ивановна', 1),
  ('ФГБУ "ЦЛАТИ по СФО"', '630099, г. Новосибирск, ул. Романова, д. 28', '1045404670211', 'www.clatisfo.ru', 'Директор', 'Винс Константин Петрович', 2),
  ('ФГБУ "ФЦАО"', '117105, г. Москва, Варшавское ш., д. 39А', '1037739128129', 'https://fcao.ru/', 'Директор', 'Плямина Ольга Владимировна', 3),
  ('ФГБУ "ЦЛАТИ по СЗФО"', '199155, г. Санкт-Петербург, вн.тер. г. Муниципальный округ Остров Декабристов, ул. Одоевского, д. 24, к. 1, литера А, офис 12-Н', '1047800010114', 'https://clatispb.ru/', 'Директор', 'Каленюк Егор Владимирович', 4),
  ('ФГБУ «ЦЛАТИ по ЮФО»', '344091, г. Ростов-на-Дону, ул. Малиновского, д. 26 А', '1046168000020', 'https://clati.ru/', 'И.о. директора', 'Шипулин Владимир Александрович', 5),
  ('ФГБУ «ЦЛАТИ по ДФО»', '680013, Хабаровский край, г. Хабаровск, пер. Кадровый, 6 А', '1042700130692', 'www.clatidv.ru', 'Директор', 'Лесник Юрий Леонтьевич', 6),
  ('ФГБУ «ЦЛАТИ по ПФО»', '603032, г. Нижний Новгород, ул. Гончарова, д. 1 А', '1025203025792', 'https://clatipfo.ru/', 'Директор', 'Ликин Дмитрий Валериевич', 7),
  ('ФГБУ "ЦЛАТИ по ЦФО"', '125009, г. Москва, Газетный пер., д. 3-5, строение 1', '1025005332307', 'https://clati-cfo.ru/', 'Директор', 'Аушев Артур Магометович', 8),
  ('АО "Эфир"', '117292, г. Москва, Вн.тер.г. Муниципальный округ Академический, проспект 60-летия Октября, дом 10А, помещение 1/6', '1237700297812', NULL, 'Генеральный директор', 'Ожгихин Иван Владимирович', 9),
  ('ФГУП "ФЭО"', '119017, г. Москва, ул. Большая Ордынка, д. 24', '1024701761534', 'www.rosfeo.ru', 'Генеральный директор', 'Погодин Максим Сергеевич', 10),
  ('ФГБУ "ЦЛАТИ по УФО"', '620049, г. Екатеринбург, ул. Мира, д. 23, оф. 604', '1026604964088', 'www.clatiurfo.ru', 'Директор', 'Илькевич Александр Анатольевич', 11),
  ('ПАО "ГМК "Норильский никель"', '647000, Красноярский край, р-н Таймырский Долгано-Ненецкий, г. Дудинка, ул. Морозова, д. 1', '1028400000298', 'www.nornickel.ru', 'Президент', 'Потанин Владимир Олегович', 12),
  ('ООО ИКЦ "Экспертиза Кузбасса"', '654044, Кемеровская обл. Кузбасс, г. Новокузнецк, пр. Архитекторов, д. 27', '1154253005708', 'http://kuz-expert.ru', 'Генеральный директор', 'Крутько Евгений Борисович', 13),
  ('АО «РУСАЛ Менеджмент»', '121096, город Москва, Василисы Кожиной ул., д. 1, этаж 2, пом. 24', '5187746025946', 'https://rusal.ru', 'Генеральный директор', 'Никитин Евгений Викторович', 14),
  ('АО «Интер РАО - Электрогенерация»', '119435, город Москва, ул. Большая Пироговская, д. 27, стр.1', '1117746460358', 'https://irao-generation.ru', 'Генеральный директор', 'Корешев Александр Анатольевич', 15),
  ('ООО "ФГК АТР"', '194017, город Санкт-Петербург, Удельный проспект, д.5, Литер А Помещение 35-Н, оф.5', '1177847179190', 'https://fgkatr.ru', 'Директор', 'Грибков Иван Владимирович', 16);

-- Seed: about documents (section=documents, type=view)
INSERT INTO about_documents (section, title, file_key, type, sort_order) VALUES
  ('documents', 'Устав ОМОР «Союз Экологов России»', 'ustav', 'view', 1),
  ('documents', 'Положение о членстве в ОМОР «Союз Экологов России»', 'membership', 'view', 2),
  ('documents', 'Приказ о вступлении в должность Генерального директора Тюрина В.А.', 'prikaz', 'view', 3),
  ('documents', 'Карточка ОМОР «Союз Экологов России»', 'rekvizity', 'view', 4);

-- Seed: join documents
INSERT INTO about_documents (section, title, file_key, type, sort_order) VALUES
  ('join', 'Заявление о приеме в члены ОМОР СЭР', 'join/zajavlenie-o-prieme-v-chleny-omor-sjer.docx', 'download', 1),
  ('join', 'Анкета члена ОМОР СЭР', 'join/anketa-chlena-omor-sjer.docx', 'download', 2),
  ('join', 'Перечень документов для вступления в ОМОР', 'perechen', 'view', 3);
