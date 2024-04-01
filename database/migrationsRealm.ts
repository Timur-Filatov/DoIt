import Realm from 'realm';

export const migrationsRealm = (oldRealm: Realm, newRealm: Realm) => {
  console.log(`applying migrations from ${oldRealm} to ${newRealm}`);

  if (oldRealm.schemaVersion < 1) {
    //fields become nullable, no logic needed
  }
};
