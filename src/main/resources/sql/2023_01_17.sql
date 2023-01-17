create table roles
(
    id            bigint       not null,
    label         varchar(100) not null,
    value         varchar(100) not null,
    CONSTRAINT roles_pk PRIMARY KEY (id)
);

GRANT all on roles to postgres;

insert into roles(id, label, value)
values
    (1, 'Administrator aplikacji', 'ROLE_ADMIN'),
    (2, 'Pracodawca', 'ROLE_EMPLOYER'),
    (3, 'Przełożony pracownika', 'ROLE_EMPLOYER_SUPERVISOR'),
    (4, 'Pracownik', 'ROLE_WORKER');
