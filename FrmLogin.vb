Public Class FrmLogin
    Private Sub FrmLogin_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        txtUsuario.BackColor = Color.FromArgb(117, 207, 182)
        txtSenha.BackColor = Color.FromArgb(117, 207, 182)
    End Sub

    Private Sub BtnLogin_Click(sender As Object, e As EventArgs) Handles btnLogin.Click
        Dim usuario As String
        Dim senha As String
        usuario = txtUsuario.Text
        senha = txtSenha.Text

        If usuario <> "" And senha <> "" Then
            'Login
            Dim form = New FrmTelaPrincipal
            form.ShowDialog()
        Else
            MsgBox("Preencha os Campos!", MsgBoxStyle.Information, "Login")
            txtUsuario.Focus()
        End If

    End Sub
End Class
