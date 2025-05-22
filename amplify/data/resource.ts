import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  TankType: a.enum(['Freshwater', 'Saltwater', 'Tropical', 'Arctic']),
  
  Aquarium: a.model({
      id: a.id().required(),
      tank: a.string().required(),
      tankType: a.ref('TankType').required(),
      fish: a.string(),
      createdAt: a.datetime(),  // Although included automatically, we add these here so we can access them later
      updatedAt: a.datetime()
    })
    .identifier(['id', 'tank'])
    .authorization(allow => [allow.authenticated()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});
