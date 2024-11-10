drop table if exists task;

create table task (
    id serial primary key,
    description varchar (255) not null
);

insert into task (description) values ('abuva');

insert into task (description) values ('another abuva');