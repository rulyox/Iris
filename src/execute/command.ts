export const dockerLoad = (imagePath: string) => `docker load --input ${imagePath}`;

export const dockerRun = (imageName: string) => `docker run -itd -v /workspace:/workspace ${imageName}`;
