create table users
(
    id            serial       not null,
    email         varchar(100) not null,
    password      varchar(100) not null,
    first_name    varchar(100) null,
    last_name     varchar(100) null,
    pesel         varchar(11)  null,
    roles         varchar(100) null,
    street        varchar(100) null,
    street_number varchar(100) null,
    postal_code   varchar(6)   null,
    city          varchar(100) null,
    phone_number  int          null,
    reset_token   varchar(100) null,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

GRANT all on users to postgres;

insert into users(id, email, first_name, last_name, password, roles)
values (1, 'admin@admin.com', 'admin', 'admin', '$2a$10$.WOAo0ZJnJth6oiTkrYh.eGqEexkR77182Ck.99wZKKPMxbZBhhe6',
        'ROLE_ADMIN');
