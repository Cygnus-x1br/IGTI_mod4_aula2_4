import express from 'express';
import { studentModel } from '../models/student.js';

const app = express();

app.get('/student', async (req, res) => {
  //res.send({ result: 'Validado' });
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (error) {
    res.status(500).send(err);
  }
});
app.post('/student', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.delete('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndDelete({ _id: req.params.id });
    if (!student) {
      res.status(404).send('Documento não encontrado na seleção.');
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});
app.patch('/student/:id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.put('/student/:_id', async (req, res) => {
  try {
    const student = await studentModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});
export { app as studentRouter };

/**
 * *Foi criado no Debugger uma linha para nas configurações do launcher a linha
 * *"runtimeArgs": ["--experimental-modules"], para que o debugger execute com
 * *os experimental modules. Verificar isso sempre que utilizar o node desta forma.
 */
