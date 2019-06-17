create database if not exists dashboard;

create table if not exists dashboard.timeAndLocation (
  id int primary key auto_increment,
  connected_at date,
  location varchar(255)
) charset 'utf8mb4';

create table if not exists dashboard.admin (
  id int primary key auto_increment,
  user_name varchar(20) not null,
  password varchar(15) not null
) charset 'utf8mb4';

create table if not exists dashboard.settings (
  id int primary key auto_increment,
  setting varchar(255) not null,
  value varchar(255),
  default_value varchar(255)
) charset 'utf8mb4';

-- admin data
insert ignore into dashboard.admin values (1, 'admin', '4b_JecSr');

-- default settings
insert ignore into dashboard.settings values (1, 'background-color', null, '#a6a6a6');
insert ignore into dashboard.settings values (2, 'news-category', null, 'general');

select 'Database successfully created!' AS '';
