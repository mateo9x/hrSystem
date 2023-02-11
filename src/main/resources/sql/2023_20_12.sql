create table attendance_work_reports
(
    id          serial  not null,
    user_id     int     not null,
    date        date    not null,
    remote_work boolean not null,
    CONSTRAINT attendance_work_reports_pk FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

GRANT all on attendance_work_reports to postgres;

create table holiday_requests
(
    id              serial       not null,
    user_id         int          not null,
    date_from       date         not null,
    date_to         date         not null,
    total_hours     int          not null,
    comment         varchar(255) null,
    request_type_id int          not null,
    request_status_id int          not null,
    CONSTRAINT holiday_requests_pk FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

GRANT all on holiday_requests to postgres;

create table annotation_for_user
(
    id          serial       not null,
    user_id     int          not null,
    create_date date         not null,
    message     varchar(255) not null,
    readed      boolean      not null,
    CONSTRAINT annotation_for_user_pk FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
);

GRANT all on annotation_for_user to postgres;

create table attendance_work_days
(
    id                        serial       not null,
    attendance_work_report_id int          not null,
    dic_attendance_work_id    int          not null,
    hours                     int          not null,
    comment                   varchar(255) not null,
    CONSTRAINT attendance_work_days_pk PRIMARY KEY (id)
);

GRANT all on attendance_work_days to postgres;
