
export class QuizModel {
    public questions: Questions[];
}

export class Questions {
    question: string;
    answers: Array<any>;
    correctIndex: number;
}
