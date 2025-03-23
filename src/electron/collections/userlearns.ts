// import * as fs from 'fs';
// import * as path from 'path';

// interface UserLearn {
//     word: string;
//     progress: number;
// }

// class UserLearns {
//     private filePath: string;
//     private data: UserLearn[];

//     constructor() {
//         this.filePath = path.join(__dirname, 'userlearns.json');
//         this.data = this.readData();
//     }

//     private readData(): UserLearn[] {
//         if (fs.existsSync(this.filePath)) {
//             const rawData = fs.readFileSync(this.filePath, 'utf-8');
//             return JSON.parse(rawData);
//         }
//         return [];
//     }

//     private writeData(): void {
//         fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
//     }

//     public getAllData(): UserLearn[] {
//         return this.data;
//     }

//     public updateProgress(word: string, progress: number): void {
//         const index = this.data.findIndex(item => item.word === word);
//         if (index !== -1) {
//             this.data[index].progress = progress;
//         } else {
//             this.data.push({ word, progress });
//         }
//         this.writeData();
//     }
// }

// export default UserLearns;