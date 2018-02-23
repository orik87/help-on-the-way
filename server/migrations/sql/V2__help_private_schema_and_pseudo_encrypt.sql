CREATE SCHEMA help_private;

CREATE FUNCTION help_private.pseudo_encrypt(VALUE int) returns int AS $$
DECLARE
  l1 int;
  l2 int;
  r1 int;
  r2 int;
  i int:=0;
BEGIN
  l1:= (VALUE >> 16) & 65535;
  r1:= VALUE & 65535;
  WHILE i < 3 LOOP
    l2 := r1;
    r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
    l1 := l2;
    r1 := r2;
    i := i + 1;
  END LOOP;
  RETURN ((r1 << 16) + l1);
END $$ LANGUAGE plpgsql strict immutable;