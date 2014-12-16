CREATE TABLE `viajes_dump` (
	`NumCuenta` VARCHAR(100) NULL DEFAULT NULL,
	`UR_Siglas` VARCHAR(100) NULL DEFAULT NULL,
	`Nom_SP` VARCHAR(100) NULL DEFAULT NULL,
	`No_Emp` VARCHAR(100) NULL DEFAULT NULL,
	`Cargo` VARCHAR(100) NULL DEFAULT NULL,
	`NivelCargo` VARCHAR(100) NULL DEFAULT NULL,
	`Estatus` VARCHAR(100) NULL DEFAULT NULL,
	`Correo` VARCHAR(100) NULL DEFAULT NULL,
	`Genero` VARCHAR(100) NULL DEFAULT NULL,
	`ObservacionesSP` VARCHAR(100) NULL DEFAULT NULL,
	`Nombre_Evento` VARCHAR(400) NULL DEFAULT NULL,
	`FechaInicio` VARCHAR(100) NULL DEFAULT NULL,
	`FechaFin` VARCHAR(100) NULL DEFAULT NULL,
	`URL_Evento` VARCHAR(100) NULL DEFAULT NULL,
	`Organizador_Evento` VARCHAR(200) NULL DEFAULT NULL,
	`PaisDestino` VARCHAR(100) NULL DEFAULT NULL,
	`EstadoDestino` VARCHAR(100) NULL DEFAULT NULL,
	`CiudadDestino` VARCHAR(100) NULL DEFAULT NULL,
	`ObservacionesEvento` VARCHAR(100) NULL DEFAULT NULL,
	`Num_Comision` VARCHAR(100) NULL DEFAULT NULL,
	`MecanismoCom` VARCHAR(100) NULL DEFAULT NULL,
	`InvitaSolicita` VARCHAR(200) NULL DEFAULT NULL,
	`UR_Nombre` VARCHAR(100) NULL DEFAULT NULL,
	`Obj_Estrategico` VARCHAR(100) NULL DEFAULT NULL,
	`Obj_Especifico` VARCHAR(100) NULL DEFAULT NULL,
	`Tema` VARCHAR(100) NULL DEFAULT NULL,
	`Motivo` VARCHAR(1000) NULL DEFAULT NULL,
	`Antecedentes` VARCHAR(1500) NULL DEFAULT NULL,
	`TipoViaje` VARCHAR(100) NULL DEFAULT NULL,
	`TipoRepresentaciomn` VARCHAR(100) NULL DEFAULT NULL,
	`TipoComision` VARCHAR(100) NULL DEFAULT NULL,
	`PaisOrigen` VARCHAR(100) NULL DEFAULT NULL,
	`EstadoOrigen` VARCHAR(100) NULL DEFAULT NULL,
	`CiudadOrigen` VARCHAR(100) NULL DEFAULT NULL,
	`FechaInicioParticipacion` VARCHAR(200) NULL DEFAULT NULL,
	`FechaFinParticipacon` VARCHAR(200) NULL DEFAULT NULL,
	`InstitucionPasaje` VARCHAR(200) NULL DEFAULT NULL,
	`InstitucionHospedaje` VARCHAR(200) NULL DEFAULT NULL,
	`InstitucionViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`NoAcuerdo` VARCHAR(200) NULL DEFAULT NULL,
	`NoOficio` VARCHAR(200) NULL DEFAULT NULL,
	`Partida` VARCHAR(200) NULL DEFAULT NULL,
	`TipoPasaje` VARCHAR(200) NULL DEFAULT NULL,
	`AerolineaSalida` VARCHAR(200) NULL DEFAULT NULL,
	`NumVueloCorridaSalida` VARCHAR(200) NULL DEFAULT NULL,
	`FechaSalida` VARCHAR(200) NULL DEFAULT NULL,
	`AerolineaLlegada` VARCHAR(200) NULL DEFAULT NULL,
	`NumVueloCorridaLlegada` VARCHAR(200) NULL DEFAULT NULL,
	`FechaLlegada` VARCHAR(200) NULL DEFAULT NULL,
	`SolicitudCambio` VARCHAR(200) NULL DEFAULT NULL,
	`FechaSolicitudVuelo` VARCHAR(200) NULL DEFAULT NULL,
	`FechaCambioVuelo` VARCHAR(200) NULL DEFAULT NULL,
	`MotivoCambio` VARCHAR(200) NULL DEFAULT NULL,
	`MontoCambio` VARCHAR(200) NULL DEFAULT NULL,
	`GastoPasaje` VARCHAR(100) NULL DEFAULT NULL,
	`PartidaPresupuestaria` VARCHAR(200) NULL DEFAULT NULL,
	`FechaInicioViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`FechaFinViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`Moneda` VARCHAR(200) NULL DEFAULT NULL,
	`ValorTipoCambio` VARCHAR(200) NULL DEFAULT NULL,
	`Homologacion` VARCHAR(200) NULL DEFAULT NULL,
	`TarifaViaticos` VARCHAR(200) NULL DEFAULT NULL,
	`DiasViaticados` VARCHAR(200) NULL DEFAULT NULL,
	`MontoViaticados` VARCHAR(200) NULL DEFAULT NULL,
	`Observaciones` VARCHAR(200) NULL DEFAULT NULL,
	`Actividades_realizadas` VARCHAR(1200) NULL DEFAULT NULL,
	`Resultados` VARCHAR(1000) NULL DEFAULT NULL,
	`ContribucionesIFAI` VARCHAR(1500) NULL DEFAULT NULL,
	`Link` VARCHAR(200) NULL DEFAULT NULL,
	`NombreHotel` VARCHAR(200) NULL DEFAULT NULL,
	`FechaEntrada_1` VARCHAR(200) NULL DEFAULT NULL,
	`FechaSalida_1` VARCHAR(200) NULL DEFAULT NULL,
	`CostoHospedaje` VARCHAR(100) NULL DEFAULT NULL,
	`MontoComprobado` DECIMAL(10,2) NULL DEFAULT NULL,
	`MontoSinComprobar` DECIMAL(10,2) NULL DEFAULT NULL,
	`MontoDevuelto` DECIMAL(10,2) NULL DEFAULT NULL
)
COMMENT='test'
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

CREATE TABLE `funcionario` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`institucion` VARCHAR(500) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`nombre` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`apellido_1` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`apellido_2` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`nombre_completo` VARCHAR(200) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`tipo_personal` VARCHAR(50) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`cargo_nombre` VARCHAR(150) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`cargo_nombre_superior` VARCHAR(150) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`unidad_administrativa` VARCHAR(100) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`clave_puesto` VARCHAR(100) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`nombre_puesto` VARCHAR(100) NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`email` VARCHAR(100) NOT NULL DEFAULT '0' COLLATE 'utf8_general_ci',
	`genero` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`id`),
	FULLTEXT INDEX `nombre_completo` (`nombre_completo`)
)
COLLATE='latin1_general_ci'
ENGINE=MyISAM
AUTO_INCREMENT=1;


insert into funcionario (institucion,nombre_completo) 
select distinct 'IFAI',Nom_SP 
from viajes_dump

