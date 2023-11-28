$(function () {
	$("#form").hide()
	getClientes()
	let editar = false

	$("#alertaCliente").hide()

	/* Comportamientos de botones, títulos y formulario */
	$("#btnAgregar").click(() => {
		$("#btnAgregar").hide()
		$("#form").show()
		$("#formTitle").text("Agregar Cliente")
		$("#btnAddUpd").text("Agregar")
	})
	$("#btnCancelar").click(() => {
		$("#form").hide()
		$("#form").trigger("reset")
		$("#btnAgregar").show()
	})

	/* Buscador de clientes */
	$("#buscar").keyup(() => {
		if ($("#buscar").val()) {
			let buscar = $("#buscar").val()
			$.ajax({
				url: "http://127.0.0.1:3000/api/buscar",
				data: { buscar },
				type: "POST",
				success: function (response) {
					if (!response.error) {
						let clientes = JSON.parse(response)
						let template = ``
						clientes.forEach((cliente) => {
							template += `
								<tr clienteId="${cliente.id}">
									<td class="text-center">${cliente.id}</td>
									<td class="text-center">${cliente.nombre}</td>
									<td class="text-center">${cliente.apellido}</td>
									<td class="text-center">${cliente.domicilio}</td>
									<td class="text-center">${cliente.correo}</td>
									<td class="d-flex justify-content-around">
										<button class="btn btn-warning" id="btnActualizar">Actualizar</button>
										<button class="btn btn-danger" id="btnEliminar">Eliminar</button>
									</td>
								</tr>
							`
						})
						$("#clientes").html(template)
					}
				}
			})
		} else {
			getClientes()
		}
	})

	/* Form para agregar o modificar algun cliente */
	$("#form").submit((e) => {
		e.preventDefault()
		if ($("#nombre").val() && $("#apellido").val() && $("#domicilio").val() && $("#correo").val()) {
			const postUpdateData = {
				id: $("#id").val(),
				nombre: $("#nombre").val(),
				apellido: $("#apellido").val(),
				domicilio: $("#domicilio").val(),
				correo: $("#correo").val()
			}
			const postAddData = {
				nombre: $("#nombre").val(),
				apellido: $("#apellido").val(),
				domicilio: $("#domicilio").val(),
				correo: $("#correo").val()
			}
			const url =
				editar === false
					? "http://127.0.0.1:3000/api/agregar"
					: "http://127.0.0.1:3000/api/actualizar"
			const postData = editar === false ? postAddData : postUpdateData
			$.ajax({
				url,
				data: postData,
				type: "POST",
				success: function (response) {
					if (!response.error) {
						$("#form").hide()
						$("#alertaCliente").hide()
						$("#form").trigger("reset")
						$("#buscar").val("")
						$("#btnAgregar").show()
						getClientes()
						if (!editar) {
							Swal.fire({
								title: "El cliente ha sido agregado",
								icon: "success",
								showConfirmButton: false,
								timer: 3000
							})
						} else {
							Swal.fire({
								title: "El cliente ha sido actualizado",
								icon: "success",
								showConfirmButton: false,
								timer: 3000
							})
							$("#id").val("")
							editar = false
						}
					}
				}
			})
		} else {
			$("#alertaCliente").show()
			$("#alertaCliente").text("Los campos no deben ir vacios")
		}
	})

	/* Función para obtener los clientes consumiendo la API creada en PHP */
	function getClientes() {
		$.ajax({
			url: "http://127.0.0.1:3000/api/clientes",
			type: "GET",
			success: function (response) {
				let clientes = JSON.parse(response)
				console.log(response)
				let template = ``
				clientes.forEach((cliente) => {
					template += `
                    <tr clienteId="${cliente.id}">
                        <td class="text-center">${cliente.id}</td>
                        <td class="text-center">${cliente.nombre}</td>
                        <td class="text-center">${cliente.apellido}</td>
                        <td class="text-center">${cliente.domicilio}</td>
                        <td class="text-center">${cliente.correo}</td>
                        <td class="d-flex justify-content-around">
                            <button class="btn btn-warning" id="btnActualizar">Actualizar</button>
                            <button class="btn btn-danger" id="btnEliminar">Eliminar</button>
                        </td>
                    </tr>
                `
				})
				$("#clientes").html(template)
			}
		})
	}

	/* Eliminar cliente */
	$(document).on("click", "#btnEliminar", () => {
		const element = $(this)[0].activeElement.parentElement.parentElement
		Swal.fire({
			title: "¿Deseas eliminar ese cliente?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí, eliminar"
		}).then((result) => {
			if (result.isConfirmed) {
				const id = $(element).attr("clienteId")
				$.ajax({
					url: "http://127.0.0.1:3000/api/eliminar",
					data: { id },
					type: "POST",
					success: function (response) {
						$("#buscar").trigger("reset")
						getClientes()
					}
				})
				Swal.fire({
					title: "El cliente ha sido eliminado",
					icon: "success",
					showConfirmButton: false,
					timer: 3000
				})
			}
		})
	})

	/* Actualizar cliente */
	$(document).on("click", "#btnActualizar", () => {
		const element = $(this)[0].activeElement.parentElement.parentElement
		const id = $(element).attr("clienteId")
		$.ajax({
			url: "http://127.0.0.1:3000/api/cliente",
			data: { id },
			type: "POST",
			success: function (response) {
				if (!response.error) {
					const cliente = JSON.parse(response)
					$("#nombre").val(cliente.nombre)
					$("#apellido").val(cliente.apellido)
					$("#domicilio").val(cliente.domicilio)
					$("#correo").val(cliente.correo)
					$("#id").val(cliente.id)
					editar = true
					$("#form").show()
					$("#formTitle").text("Modificar Cliente")
					$("#btnAddUpd").text("Modificar")
				}
			}
		})
	})
})
