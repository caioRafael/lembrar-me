export type CognitoUserAttribute = {
  Name: string
  Value: string
}

type CognitoUserAttributes = CognitoUserAttribute[]

type ParsedUserAttributes = Record<string, string>

export function parseUserAttributes(
  attributes: CognitoUserAttributes,
): ParsedUserAttributes {
  return attributes.reduce((acc, attr) => {
    acc[attr.Name] = attr.Value
    return acc
  }, {} as ParsedUserAttributes)
}
