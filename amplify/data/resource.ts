import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

// Define the enum values for validation and TypeScript type safety
const TANK_TYPES = ['Freshwater', 'Saltwater', 'Tropical', 'Arctic'] as const;
type TankTypeValue = typeof TANK_TYPES[number];

const schema = a.schema({
  Aquarium: a.model({
      id: a.id().required(),
      tank: a.string().required(),
      // Store as string but validate against allowed values
      tankType: a.string()
        .required()
        .validate(value => {
          const stringValue = String(value);
          TANK_TYPES.includes(stringValue as TankTypeValue) 
            ? { valid: true } 
            : { valid: false, message: `tankType must be one of: ${TANK_TYPES.join(', ')}` }
        }),
      fish: a.string(),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .identifier(['id', 'tankType'])  // Now works because tankType is a string
    .authorization(allow => [allow.authenticated()])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});
