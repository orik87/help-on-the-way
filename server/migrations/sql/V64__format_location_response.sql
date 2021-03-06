create or replace function help.address_location(a help.address)
returns jsonb as $$
declare
	geo_json jsonb;
begin
select ST_AsGeoJSON(a.geom)::jsonb into geo_json;
 return (select json_build_object(
  'lat', geo_json->'coordinates'->>1,
  'lng', geo_json->'coordinates'->>0
  ));
end;
$$ language plpgsql strict stable;
comment on function help.address_location (a help.address) is 'a coumputed column, that returns the geom field value, as a readable points json';

GRANT EXECUTE ON FUNCTION help.address_location(a help.address) TO "SPECIALIST";