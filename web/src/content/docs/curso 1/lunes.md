---
title: lunes
description: Estructura y Contenido para los Cursos de Backend.
---
# ¿Qué es una API?
Una API (Interfaz de Programación de Aplicaciones) es un conjunto de reglas,
protocolos y herramientas que permiten a los desarrolladores interactuar con un
software, una biblioteca o un servicio externo sin necesidad de conocer cómo
están implementados internamente.

## Tipos de APIs
| Tipo         | REST               | SOAP                              | WEB SOCKET                  | GRPC                     |
|--------------|--------------------|-----------------------------------|-----------------------------|--------------------------|
| Formato      | JSON, XML          | XML                               | JSON, texto plano           | Protocol Buffers         |
| Comunicación | Sin estado         | Con estado                        | Bidireccional               | Bidireccional            |
| Usos         | Aplicaciones web, APIs públicas | Transacciones bancarias, servicios empresariales | Chat en tiempo real, juegos online | Microservicios, sistemas distribuidos |
| Características | Ligero, fácil de implementar | Estricto, seguro, confiable | Conexión persistente, baja latencia | Alto rendimiento, eficiente |

***
---
#### representacion grafica
![Grafico animado de como se comunican los servidores segun su tipo](../../../assets/1703776643037.gif)

## Ejemplo de una api rest implementada con microservicios
![Grafico de como netflix funciona a nivel de infraestructura](../../../assets/1694984950086.gif)
Esta es una grafica de como netflix gestiona sus servicios viendo que tiene muchas apis siendo la principal un aapi en java spring boot y la de video con amazon S3.

## Ejemplo de una API híbrida entre monolito y microservicios

![Gráfico de cómo Discord funciona a nivel de infraestructura](../../../assets/1_mdYzP6htH1cZfnoVc1WetQ.webp)

Esta es una representación gráfica de cómo la API principal de Discord, desarrollada en Python, se comunica con un balanceador de carga escrito en Rust. Este, a su vez, interactúa con un sistema distribuido basado en ScyllaDB, la base de datos encargada de gestionar los mensajes de los usuarios.

---

### Enlace a la clase grabada y a la transcripción. 

[Onedrive](https://uninorte-my.sharepoint.com/:f:/g/personal/asprinos_uninorte_edu_co/Et-m3TfGKoxGuQ4VldDmms8BZc54a23Tc1EZIRjr3RvtGA?e=WnDo8d)
