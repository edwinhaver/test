import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

export const Contacts = new Mongo.Collection('contacts');

// Contacts.schema = new SimpleSchema({
//   firstName:    {type: String, min: 1},
//   lastName:     {type: String, min: 1},
//   designation:  {type: String, min: 1},
//   email:        {type: String, regEx: SimpleSchema.RegEx.EmailWithTLD},
//   phone:        {type: String, regEx: SimpleSchema.RegEx.Phone},
//   mobile:       {type: String, regEx: SimpleSchema.RegEx.Phone}
// });

if (Meteor.isServer) {
  Meteor.publish('contacts', function () {
    return Contacts.find();
  });
}

Meteor.methods({
  'contacts.insert'(fields) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const context = new SimpleSchema({
      firstName:    {type: String, min: 1},
      lastName:     {type: String, min: 1},
      designation:  {type: String, min: 1},
      email:        {type: String, regEx: SimpleSchema.RegEx.EmailWithTLD},
      phone:        {type: String, regEx: SimpleSchema.RegEx.Phone},
      mobile:       {type: String, regEx: SimpleSchema.RegEx.Phone}
    });
    context.validate({
      ...fields
    });

    // Contacts.schema.validate({...fields});

    return Contacts.insert({...fields});
  },
  'contacts.remove'(_id) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id: {type: String, min: 1}
    }).validate({_id});

    Contacts.remove({ _id });
  },
  'contacts.update'(_id, updates) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      _id:          {type: String, min: 1},
      firstName:    {type: String, min: 1},
      lastName:     {type: String, min: 1},
      designation:  {type: String, min: 1},
      email:        {type: String, regEx: SimpleSchema.RegEx.EmailWithTLD},
      phone:        {type: String, regEx: SimpleSchema.RegEx.Phone},
      mobile:       {type: String, regEx: SimpleSchema.RegEx.Phone}
    }).validate({_id, ...fields});

    Contacts.update({_id}, {$set: {...updates}});
  }
});
