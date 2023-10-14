import React from 'react';

function Stats({ contacts }) {
  const totalContacts = contacts.length;
  const totalPhones = contacts.reduce((acc, contact) => acc + contact.phones.length, 0);
  

  return (
    <div>
      <p>Total Contacts: {stats.totalContacts}</p>
      <p>Total Phones: {stats.totalPhones}</p>
      <p>Newest Contact: {stats.newestContact}</p>
      <p>Oldest Contact: {stats.oldestContact}</p>
    </div>
  );
  }

export default Stats;
