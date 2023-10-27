--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE csfc_inventory;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:uwCw9Mc/E1RwifRkYX7CUA==$H+Z+HY5fFiOvPRGDP3sj8+pqRdVl9aojridZwLNhfeg=:Rrnw941mLmN3gf0HNRwao9+11AkzYdSSjXbi/qTJ8Ic=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "csfc_inventory" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: csfc_inventory; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE csfc_inventory WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE csfc_inventory OWNER TO postgres;

\connect csfc_inventory

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: inventory_ledger; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory_ledger (
    id integer NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    directorate character varying(25),
    "position" character varying(50),
    laptop_sn character varying(25),
    laptop_name character varying(50),
    aruba_name character varying(255),
    cert_exp integer,
    hand_receipt text,
    router_sn character varying(25),
    boi boolean
);


ALTER TABLE public.inventory_ledger OWNER TO postgres;

--
-- Name: inventory_ledger_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_ledger_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_ledger_id_seq OWNER TO postgres;

--
-- Name: inventory_ledger_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_ledger_id_seq OWNED BY public.inventory_ledger.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: inventory_ledger id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_ledger ALTER COLUMN id SET DEFAULT nextval('public.inventory_ledger_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Data for Name: inventory_ledger; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_ledger (id, first_name, last_name, directorate, "position", laptop_sn, laptop_name, aruba_name, cert_exp, hand_receipt, router_sn, boi) FROM stdin;
2	Sherman	Wintheiser	J1	Principal Mobility Supervisor	g3ldkc	nvyfhyrjyo9p	\N	\N	No File Uploaded	cicw05cg	f
3	Camryn	O'Connell	J2	Future Mobility Technician	t48l6y	mqu6lnu7o802	\N	\N	No File Uploaded	pfr2o58k	f
4	Gianni	Toy	J1	Global Branding Designer	gw91wy	c5detv4wyegx	\N	\N	No File Uploaded	doc9hdhd	f
5	Keira	Hane	J4	Senior Accounts Planner	36m3oj	p3jj4a4e5dy8	\N	\N	No File Uploaded	005e06ds	f
6	Laron	Barton	J1	Principal Accountability Executive	mfsu70	gmkm704nulqc	\N	\N	No File Uploaded	u2ce4w1e	t
7	Christina	Ledner	J8	Direct Branding Analyst	vvj78o	s78sx6qqpqbv	\N	\N	No File Uploaded	wefdvojy	t
8	Heidi	Graham	J5	Central Communications Analyst	fbqmlt	6r8s6q9e72j7	\N	\N	No File Uploaded	fpw29fia	t
9	Zane	Gleichner	J6	Customer Accountability Coordinator	lxeuc5	xi1abi5fkkz4	\N	\N	No File Uploaded	2x8yoa6m	f
10	Eugenia	Konopelski	J3	Customer Assurance Manager	14blnw	4lybu14kzywr	\N	\N	No File Uploaded	ap5mss9o	f
11	Melvin	Corwin	J2	Senior Optimization Assistant	cxf9oc	7gt4gbattbpd	\N	\N	No File Uploaded	kutbj67s	f
12	Sage	O'Connell	J5	Dynamic Response Analyst	l5btyr	cx9vw2as1czs	\N	\N	No File Uploaded	dpwzodpx	t
13	Kelli	Dooley	J3	Principal Intranet Consultant	8mch65	4zhsqdr0asud	\N	\N	No File Uploaded	s9n2ibjq	f
14	Lauren	Fisher	J4	Legacy Metrics Officer	swyw1n	h5pj0pkjes47	\N	\N	No File Uploaded	5gwmgq5n	t
15	Horacio	Hessel	J4	Product Applications Supervisor	l2eix5	qrvuihi9owi6	\N	\N	No File Uploaded	x1xgzzmi	f
16	Jevon	Rempel	J6	Corporate Group Assistant	f1sxjg	l17kdhvew6wt	\N	\N	No File Uploaded	ipmctqnk	t
17	Kaley	Ferry	J4	International Factors Officer	3m5kdh	z0lns75zkzi1	\N	\N	No File Uploaded	909z0197	t
18	Heidi	Kozey	J5	Internal Accountability Liaison	1ie2w0	pcsi0dmghm4e	\N	\N	No File Uploaded	4i71k62k	f
19	Tatum	Koss	J4	International Paradigm Producer	c4zsq1	ki2esjytcaop	\N	\N	No File Uploaded	z4dg47an	t
20	Mafalda	Balistreri	J4	Forward Configuration Administrator	ignuse	x1zngp2nijb8	\N	\N	No File Uploaded	kluuv36s	f
21	Monroe	Kunde	J1	Investor Assurance Producer	0mr0tm	jyozjwcaf89i	\N	\N	No File Uploaded	vgrmiie7	t
22	Era	Larson	J4	Central Identity Architect	44l1az	yu6bl5h6795h	\N	\N	No File Uploaded	kk6twsyr	f
23	Griffin	Powlowski	J4	Central Integration Facilitator	nvzg6n	cm6177d8b585	\N	\N	No File Uploaded	et6gn93p	t
24	Tamara	Connelly	J1	Regional Division Facilitator	bchx1i	518pgzbiz5kn	\N	\N	No File Uploaded	byipcw6w	t
25	Candelario	Roberts	J1	Forward Metrics Developer	rg2icp	r32kkwhquxp9	\N	\N	No File Uploaded	y8jw2u51	f
26	Kailey	Hermiston	J6	Global Mobility Strategist	sf8z8v	bn85wfbvccwe	\N	\N	No File Uploaded	zqbk964s	t
27	Clyde	Collier	J8	Lead Group Producer	bv5p4o	63rodmdmeyv5	\N	\N	No File Uploaded	w0my20ir	f
28	Shania	Armstrong	J1	Principal Accounts Representative	8mw1n0	vm4641n5k6gd	\N	\N	No File Uploaded	f7hmd9u5	f
29	Audie	Little	J5	National Quality Associate	4n8lt2	kvvrekmteg8x	\N	\N	No File Uploaded	11yhukai	f
30	Ottilie	Parker	J4	Internal Creative Engineer	53vh8c	40fyy6jmo49k	\N	\N	No File Uploaded	jjzchlvr	f
31	Andres	Kertzmann	J2	National Division Executive	b5o8t6	8m325k8dk71k	\N	\N	No File Uploaded	fwk7ggy5	t
32	Glen	Turner	J2	District Quality Consultant	81bwfr	jxaw7e5pg654	\N	\N	No File Uploaded	7loxp6nj	f
33	Mack	Williamson	J8	Global Interactions Assistant	h4cm2k	ub6hujkm6gl3	\N	\N	No File Uploaded	cuhq74w2	t
34	Ike	Hermiston	J8	Product Usability Architect	phm89w	8oeuq5vb3oh1	\N	\N	No File Uploaded	946a391c	f
35	Tristin	Trantow	J8	Principal Configuration Producer	5itkjn	o4v8edcn2nyy	\N	\N	No File Uploaded	aflkev2g	f
36	Julio	Schuster	J1	Corporate Accountability Consultant	pemaby	bcp60eegicez	\N	\N	No File Uploaded	p60hjpto	f
37	Nickolas	Labadie	J5	Internal Infrastructure Agent	p93ngy	hk545ky0cz6m	\N	\N	No File Uploaded	wlrekjx4	t
38	Ansley	Littel	J6	Corporate Group Representative	bl2wyc	dgs2775jx3sz	\N	\N	No File Uploaded	6edlkga1	t
39	Coleman	Kris	J4	Future Research Strategist	gduf4g	j6pf0p6yaewh	\N	\N	No File Uploaded	4rn4k9mb	f
40	Keon	Legros	J1	Chief Data Administrator	6zuafq	us9jye7axwt4	\N	\N	No File Uploaded	ycpiciv5	f
41	Eriberto	Haley	J5	Regional Quality Engineer	v3y4vy	jktnuizsutyy	\N	\N	No File Uploaded	vnycyjgc	t
42	Ian	Stiedemann	J8	National Group Architect	az17em	y5r8bx7mdk78	\N	\N	No File Uploaded	hyir8wvq	f
43	Bell	Swaniawski	J2	Senior Accountability Director	y1m9k3	n811u3xv1cua	\N	\N	No File Uploaded	z5pn5cf9	t
44	Nichole	Buckridge	J5	National Branding Liaison	g31fk0	zl0e2gkz3y78	\N	\N	No File Uploaded	3ifha238	t
45	Ward	Kessler	J6	District Response Producer	p4n9b3	qfputl0hye8i	\N	\N	No File Uploaded	cuwdfn2j	f
46	Zackary	Bechtelar	J5	Product Integration Representative	u62l4o	k95t9kpkhun5	\N	\N	No File Uploaded	ir2l1h8o	f
47	Holly	O'Conner	J1	Investor Markets Architect	8xk1a9	xa4hsmcmtf19	\N	\N	No File Uploaded	nsq230x1	t
48	Van	Miller	J1	Global Response Strategist	5vpupw	bms8i8w7pv29	\N	\N	No File Uploaded	brtcts1w	t
49	Nora	Friesen	J2	Chief Division Representative	ye5pdd	p4fjiq490esb	\N	\N	No File Uploaded	bc94n23z	t
50	Darien	O'Kon	J8	Chief Markets Manager	7cqpeq	66miyzilyii1	\N	\N	No File Uploaded	ije0z52q	f
51	Noble	O'Reilly	J6	Direct Paradigm Representative	731byd	w20xnw0zlylv	\N	\N	No File Uploaded	odxmf7pc	t
1	Kellen	Jerde	J2	National Response Orchestrator	8wzkig	njmxbl0sws5b	2222	5555	No File Uploaded	pm0lpm48	f
52	Matt	fouq	J6	tech	3jr2ljds	j023sd	5555	1111	No File Uploaded	2j0jslsd	t
53	matt	fdsfsd	J6	fdsfds	3jr2ljds	aaa	2222	5555	No File Uploaded	2j0jslsd	t
54	Matt	fouq	fsdfs	aaa	aaa	aaa	2222	4444	No File Uploaded	fsdfd	t
\.


--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations (id, name, batch, migration_time) FROM stdin;
23	20230119135009_create_inventory_tables.js	1	2023-10-23 17:18:46.531+00
\.


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.knex_migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Name: inventory_ledger_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_ledger_id_seq', 54, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 23, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: inventory_ledger inventory_ledger_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_ledger
    ADD CONSTRAINT inventory_ledger_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Debian 15.1-1.pgdg110+1)
-- Dumped by pg_dump version 15.1 (Debian 15.1-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

