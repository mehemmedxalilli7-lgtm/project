import mongoose, { Schema, Document } from 'mongoose';


export enum Role {
 ADMIN = 'ADMIN',
 TEACHER = 'TEACHER',
 STUDENT = 'STUDENT'
}


export interface IUser extends Document {
 identifier: string; // Tələbə biletinin nömrəsi və ya Müəllim ID-si (Giriş üçün)
 password: string;
 role: Role;
 firstName: string;
 lastName: string;
 email?: string;
 phone?: string;
 createdAt:Date,
 updatedAt:Date
  // Tələbələr üçün xüsusi sahələr
 groupId?: mongoose.Types.ObjectId;
 faculty?: string;     // Fakültə (məs: Təbiət elmləri və texnologiya fakültəsi)
 speciality?: string;  // İxtisas (məs: İnformasiya Texnologiyaları)
 enrollmentYear?: number;
  // Müəllimlər üçün xüsusi sahələr
 department?: string;  // Kafedra
 academicDegree?: string; // Elmi dərəcə,
 
}


const UserSchema: Schema = new Schema({
 identifier: { type: String, required: true, unique: true },
 password: { type: String, required: true },
 role: { type: String, enum: Object.values(Role), required: true },
 firstName: { type: String, required: true },
 lastName: { type: String, required: true },
 email: { type: String, unique: true, sparse: true },
 phone: { type: String },


 // Tələbə detalları
 groupId: { type: Schema.Types.ObjectId, ref: 'Group' },
 faculty: { type: String },
 speciality: { type: String },
 enrollmentYear: { type: Number },


 // Müəllim detalları
 department: { type: String },
 academicDegree: { type: String },
}, { timestamps: true });



// User -> mongoose MongoDB bir dene sened yaradir, users
export default mongoose.model<IUser>('User', UserSchema);
