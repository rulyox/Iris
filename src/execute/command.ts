export const dockerLoad = (imagePath: string) =>
    `docker load --input ${imagePath}`;

export const dockerRun = (imageName: string, containerName: string) =>
    `docker run --interactive --tty --detach --volume /workspace:/workspace --name ${containerName} ${imageName}`;

export const dockerExec = (containerName: string, command: string) =>
    `docker exec --interactive --tty ${containerName} ${command}`;

export const dockerRm = (containerName: string) =>
    `docker rm --force ${containerName}`;
