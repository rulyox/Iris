import { exec } from 'child_process';

export const execute = (command: string): Promise<{ stdout: string, stderr: string }> => {
    return new Promise((resolve, reject) => {

        exec(command, (error, stdout, stderr) => {

            if(error) reject(error);

            resolve({
                stdout: stdout,
                stderr: stderr
            });

        });

    });
};
