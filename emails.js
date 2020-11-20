var Emails = require("./emails.model");

exports.index = async function () {
  try {
    const allDocuments = await Emails.find({});

      return "Dados encontrados com sucesso.";
  } catch (error) {
      return error.message;
  }
};

exports.create = async function (email) {
  try {
    let emails = new Emails({
      email: email,
    });

    if (await Emails.findOne({ email: emails.email }).exec()) {
        return "Este e-mail já está cadastrado para receber os alertas.";
    }

    emails.save(function (err) {
      if (err) {
          return "Não foi possível completar a operação.";
      }
        return `Você foi adicionad@ à lista de alertas com sucesso!`;
    });
    return "sucesso";
  } catch (err) {
      return `Não foi possível completar a operação. ${err}.`;
  }
};

exports.delete = async function (email) {
    Emails.deleteOne({ email: email }, function(err, result) {
        if (err) {
            return "Não foi possível completar a operação.";
        } else {
            return"Você foi removido da lista de alertas com sucesso.";
        }
    });
};

exports.deleteAll = async function (req, res) {
    Emails.deleteMany({}, function (err) {
    if (err)
        return "Não foi possível completar a operação.";
    else
        return "Todas as pessoas cadastradas na newslsetter foram removidas.";
  });
};

exports.getAllSubscribers = async function () {
  return await Emails.distinct("email");
};