const { response } = require("express");
const Reserva = require("../models/Reserva");

const getReservas = async (req, res = response) => {
  const reservas = await Reserva.find().populate("user", "name");

  res.json({
    ok: true,
    reservas,
  });
};

const crearReserva = async (req, res = response) => {
  const reserva = new Reserva(req.body);

  try {
    reserva.user = req.uid;

    const reservaGuardado = await reserva.save();

    res.json({
      ok: true,
      reserva: reservaGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const actualizarReserva = async (req, res = response) => {
  const reservaId = req.params.id;
  const uid = req.uid;

  try {
    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        msg: "Reserva inexistente para ese id",
      });
    }

    if (reserva.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puede editar esta reserva",
      });
    }

    const nuevaReserva = {
      ...req.body,
      user: uid,
    };

    const reservaActualizado = await Reserva.findByIdAndUpdate(
      reservaId,
      nuevaReserva,
      { new: true }
    );

    res.json({
      ok: true,
      evento: reservaActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

const borrarReserva = async (req, res = response) => {
  const reservaId = req.params.id;
  const uid = req.uid;

  try {
    const reserva = await Reserva.findById(reservaId);

    if (!reserva) {
      return res.status(404).json({
        ok: false,
        msg: "Evento inexistente para ese id",
      });
    }

    if (reserva.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No puede borrar este evento",
      });
    }

    await Reserva.findByIdAndDelete(reservaId);

    res.json({
      ok: true,
      msg: "Reserva Borrada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error",
    });
  }
};

module.exports = {
  getReservas,
  crearReserva,
  actualizarReserva,
  borrarReserva,
};
