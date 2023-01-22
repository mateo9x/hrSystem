create table holiday_request_statuses
(
    id            bigint       not null,
    name         varchar(50) not null,
    CONSTRAINT holiday_request_statuses_pk PRIMARY KEY (id)
);

GRANT all on holiday_request_statuses to postgres;

insert into holiday_request_statuses(id, name)
values
    (1, 'Wysłano'),
    (2, 'Zatwierdzono'),
    (3, 'Odrzucono');

create table holiday_request_types
(
    id            bigint       not null,
    name         varchar(50) not null,
    CONSTRAINT holiday_request_types_pk PRIMARY KEY (id)
);

GRANT all on holiday_request_types to postgres;

insert into holiday_request_types(id, name)
values
    (1, 'Urlop wypoczynkowy'),
    (2, 'Urlop bezpłatny'),
    (3, 'Urlop okolicznościowy'),
    (4, 'Urlop na żądanie'),
    (5, 'Urlop szkoleniowy'),
    (6, 'Opieka na dziecko');
