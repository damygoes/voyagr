/**
 * @openapi
 * /api/v1/entries:
 *   get:
 *     summary: Get all entries
 *     tags:
 *       - Entries
 *     responses:
 *       200:
 *         description: A list of entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   entry_id:
 *                     type: string
 *                     format: uuid
 *                   title:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                     format: uuid
 *                   description:
 *                     type: string
 *                   location:
 *                     type: object
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
