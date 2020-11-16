import { Schema, model, Document } from 'mongoose'

export interface IMenuSchema extends Document {
  code: string,
  name: string,
  iconName: string,
  className: string,
  submenus: IMenuSchema[],
  resource: string,
  createdAt: Date,
  updatedAt: Date
}

const MenuSchema = new Schema({
  code: {
    type: String,
    required: [true, "é obrigatório"],
    uppercase: true,
    index: true
  },
  name: {
    type: String,
    required: [true, "é obrigatório"],
  },
  iconName: String,
  className: String,
  resource: String,
  submenus: Array
},
{
  timestamps: true,
})

export default model<IMenuSchema>('Menu', MenuSchema)
