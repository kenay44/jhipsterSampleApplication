import { BaseEntity } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public startDate?: any,
        public endDate?: any,
        public location?: string,
        public maxParticipants?: number,
    ) {
    }
}
