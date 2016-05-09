import fetchJson from '../fetch/json';
import Debug from 'debug';
const debug = Debug('regressions');

const BASE = 'https://bugzilla.mozilla.org/rest/bug';

// const patchQuery()

function searchFixed(version) {
  const current = parseInt(version);
  const prior = current - 1;
  return `o5=equals&keywords=regression%2C&keywords_type=allwords&list_id=13003816&v11=INCOMPLETE&o1=anyexact&j2=OR&o9=notequals&v10=WORKSFORME&o16=notequals&f13=CP&v5=---&f12=resolution&v9=WONTFIX&o4=equals&o12=notequals&v1=fixed%2C verified&v16=DUPLICATE&v4=%3F&f10=resolution&f1=cf_status_firefox${current}&o3=equals&f8=resolution&o11=notequals&v3=unaffected&f15=OP&f9=resolution&f4=cf_status_firefox${prior}&o10=notequals&query_format=advanced&f3=cf_status_firefox${prior}&f2=OP&v12=EXPIRED&f11=resolution&f5=cf_status_firefox${prior}&v8=INVALID&f6=CP&f7=OP&o8=notequals&f16=resolution`;
}

function searchMissed(version, before) {
  const current = parseInt(version);
  const prior = current - 1;
  return `o5=equals&keywords=regression%2C&keywords_type=allwords&list_id=13007178&v11=INCOMPLETE&j2=OR&o1=equals&o14=lessthan&o9=notequals&v10=WORKSFORME&f13=CP&v5=---&f12=resolution&v9=WONTFIX&o4=equals&o12=notequals&f14=creation_ts&v1=affected&v4=%3F&f10=resolution&f1=cf_status_firefox${current}&o3=equals&f8=resolution&v3=unaffected&o11=notequals&f9=resolution&f4=cf_status_firefox${prior}&query_format=advanced&o10=notequals&f3=cf_status_firefox${prior}&f2=OP&v12=EXPIRED&f11=resolution&f5=cf_status_firefox${prior}&v8=INVALID&f6=CP&v14=${before}&f7=OP&o8=notequals`;
}

export async function getFixedCount(version) {
  const query = searchFixed(version);
  debug('Fixed count: %s', query);
  const response = await fetchJson(`${BASE}?${query}`);
  return response.bugs.length;
}

export async function getMissedCount(version, before) {
  const query = searchMissed(version, before);
  debug('Missed count: %s', query);
  const response = await fetchJson(`${BASE}?${query}`);
  return response.bugs.length;
}