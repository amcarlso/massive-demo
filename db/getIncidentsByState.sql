select incidents.id, state, injuries.name as injury, affectedareas.name as affectedArea, causes.name as cause from incidents
join injuries on incidents.injuryid = injuries.id
join affectedareas on affectedareas.id = injuries.id
join causes on causes.id = incidents.causeid
where state = $(uSstate)