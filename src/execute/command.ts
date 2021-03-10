export const dockerLoad = (imagePath: string) => `
docker load -i ${imagePath}
`;
